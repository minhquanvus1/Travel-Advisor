package com.project.travel_advisor.service.tourBooking;

import com.project.travel_advisor.dto.GetTourBookingResponseDto;
import com.project.travel_advisor.dto.TourBookingRequestDto;
import com.project.travel_advisor.dto.TourBookingResponseDto;
import com.project.travel_advisor.entity.Tour;
import com.project.travel_advisor.entity.TourBooking;
import com.project.travel_advisor.entity.User;
import com.project.travel_advisor.exception.ResourceNotFoundException;
import com.project.travel_advisor.mapper.TourBookingMapper;
import com.project.travel_advisor.repository.TourBookingRepository;
import com.project.travel_advisor.repository.TourRepository;
import com.project.travel_advisor.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TourBookingServiceImpl implements TourBookingService {

    private final TourBookingRepository tourBookingRepository;

    private final UserRepository userRepository;

    private final TourRepository tourRepository;
    @Override
    @Transactional
    public TourBookingResponseDto bookATour(TourBookingRequestDto tourBookingRequestDto) {

        User foundUser = userRepository.findById(tourBookingRequestDto.userId()).orElseThrow(() -> new ResourceNotFoundException("This Tour is booked by a User with id " + tourBookingRequestDto.userId() + " does not exist"));

        Tour foundTour = tourRepository.findById(tourBookingRequestDto.tourId()).orElseThrow(() -> new ResourceNotFoundException("This Tour with id " + tourBookingRequestDto.tourId() + " does not exist"));

        TourBooking mappedTourBooking = TourBookingMapper.mapToTourBooking(tourBookingRequestDto);
        foundUser.addTourBooking(mappedTourBooking);
        foundTour.addTourBooking(mappedTourBooking);

        String trackingNumber = generateOrderTrackingNumber();
        mappedTourBooking.setTourBookingTrackingNumber(trackingNumber);
        TourBooking savedTourBooking = tourBookingRepository.save(mappedTourBooking);

        return TourBookingMapper.mapToTourBookingResponseDto(savedTourBooking);
    }

    @Override
    public List<GetTourBookingResponseDto> findAllTourBookings() {
        return tourBookingRepository.findAll().stream().map(TourBookingMapper::mapToGetTourBookingResponseDto).toList();
    }

    @Override
    public List<GetTourBookingResponseDto> findAllTourBookingsByUserId(Long userId) {
        User foundUser = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("This User with id " + userId + " does not exist"));
        List<TourBooking> tourBookings = tourBookingRepository.findAllByUserId(userId);
        return tourBookings.stream().map(TourBookingMapper::mapToGetTourBookingResponseDto).toList();
    }

    @Override
    public void deleteATourBookingById(Long id) {

        TourBooking foundTourBooking = tourBookingRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("This Tour Booking with id " + id + " does not exist"));

        foundTourBooking.getUser().removeTourBooking(foundTourBooking);
        foundTourBooking.getTour().removeTourBooking(foundTourBooking);

        tourBookingRepository.delete(foundTourBooking);
    }

    private String generateOrderTrackingNumber() {

        // generate a random UUID number (UUID version 4) (Universally Unique Identifier)
        return UUID.randomUUID().toString();
    }
}
