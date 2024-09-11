package com.project.travel_advisor.dto;


import jakarta.validation.constraints.*;

import java.math.BigDecimal;
import java.time.LocalDate;

public record TourBookingRequestDto(

        @NotNull(message = "userId must be provided")
        @Min(value = 0, message = "userId must be >= 0")
        Long userId,

        @NotNull(message = "tourId must be provided")
        @Min(value = 0, message = "tourId must be >= 0")
        Long tourId,

        @NotNull(message = "number of people must be provided")
        @Min(value = 1, message = "number of people must be >= 1")
        int numberOfPeople,

        @NotNull(message = "total price must be provided")
        @Positive(message = "total price must be a positive number")
        @DecimalMin(value = "0.0", message = "total price must be >= 0")
        BigDecimal totalPrice,

        @NotNull(message = "tour start date must be provided")
        @Future(message = "The tour start date must be today or in the future")
        LocalDate tourStartDate
) {
}
