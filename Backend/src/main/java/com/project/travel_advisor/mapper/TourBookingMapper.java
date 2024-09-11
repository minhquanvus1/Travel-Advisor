package com.project.travel_advisor.mapper;

import com.project.travel_advisor.dto.GetTourBookingResponseDto;
import com.project.travel_advisor.dto.TourBookingRequestDto;
import com.project.travel_advisor.dto.TourBookingResponseDto;
import com.project.travel_advisor.entity.TourBooking;

public class TourBookingMapper {

    public static TourBooking mapToTourBooking(TourBookingRequestDto tourBookingRequestDto) {

        return TourBooking
                .builder()
                .numberOfPeople(tourBookingRequestDto.numberOfPeople())
                .totalPrice(tourBookingRequestDto.totalPrice())
                .tourStartDate(tourBookingRequestDto.tourStartDate())
                .user(null)
                .tour(null)
                .build();
    }

    public static TourBookingResponseDto mapToTourBookingResponseDto(TourBooking tourBooking) {

        return new TourBookingResponseDto(tourBooking.getTourBookingTrackingNumber());
    }

    public static GetTourBookingResponseDto mapToGetTourBookingResponseDto(TourBooking tourBooking) {

        return new GetTourBookingResponseDto(
                tourBooking.getId(),
                tourBooking.getUser().getId(),
                tourBooking.getTour().getId(),
                tourBooking.getTourBookingTrackingNumber(),
                tourBooking.getNumberOfPeople(),
                tourBooking.getTotalPrice(),
                tourBooking.getTourStartDate()
        );
    }
}
