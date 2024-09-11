package com.project.travel_advisor.dto;

import jakarta.persistence.Column;

import java.math.BigDecimal;
import java.time.LocalDate;

public record GetTourBookingResponseDto(

        Long id,

        Long userId,

        Long tourId,

        String tourBookingTrackingNumber,

        int numberOfPeople,

        BigDecimal totalPrice,

        LocalDate tourStartDate
) {
}
