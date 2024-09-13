package com.project.travel_advisor.mapper;

import com.project.travel_advisor.dto.GetTourBookingResponseDto;
import com.project.travel_advisor.dto.TourBookingRequestDto;
import com.project.travel_advisor.dto.TourBookingResponseDto;
import com.project.travel_advisor.entity.TourBooking;
import com.project.travel_advisor.entity.TourImage;

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

        // Find the primary image URL
        String tourPrimaryImageUrl = tourBooking.getTour().getTourImages().stream()
                .filter(TourImage::getIsPrimary) // filter by the 'isPrimary' field
                .findFirst() // get the first match (there should only be one primary image)
                .map(TourImage::getImageUrl) // extract the imageUrl
                .orElse(null); // return null if no primary image is found

        return new GetTourBookingResponseDto(
                tourBooking.getId(),
                tourBooking.getUser().getId(),
                tourBooking.getTour().getId(),
                tourBooking.getTour().getName(),
                tourPrimaryImageUrl,
                tourBooking.getTourBookingTrackingNumber(),
                tourBooking.getNumberOfPeople(),
                tourBooking.getTotalPrice(),
                tourBooking.getTourStartDate()
        );
    }
}
