package com.project.travel_advisor.service.tourBooking;

import com.project.travel_advisor.dto.GetTourBookingResponseDto;
import com.project.travel_advisor.dto.TourBookingRequestDto;
import com.project.travel_advisor.dto.TourBookingResponseDto;

import java.util.List;

public interface TourBookingService {

    TourBookingResponseDto bookATour(TourBookingRequestDto tourBookingRequestDto);

    List<GetTourBookingResponseDto> findAllTourBookings();

    List<GetTourBookingResponseDto> findAllTourBookingsByUserId(Long userId);

    void deleteATourBookingById(Long id);
}
