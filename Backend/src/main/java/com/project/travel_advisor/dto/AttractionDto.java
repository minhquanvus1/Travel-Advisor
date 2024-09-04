package com.project.travel_advisor.dto;

import com.project.travel_advisor.entity.Address;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;

import java.math.BigDecimal;

public record AttractionDto(
        Long id,

        @NotBlank(message = "Attraction Name must be provided")
        String name,

        @NotNull(message = "subcategoryId must be provided")
        @Min(value = 0, message = "subcategoryId must be >= 0")
        Long subcategoryId,

        String subcategoryName,

        @NotNull(message = "cityId must be provided")
        @Min(value = 0, message = "cityId must be >= 0")
        Long cityId,

        String cityName,

        @Positive(message = "number of reviews must be a positive number")
        int numberOfReviews,

        String imageUrl,

        String websiteUrl,

        @Valid
        Address addressObj,

        @NotNull(message = "latitude must be provided")
        double latitude,

        @NotNull(message = "longitude must be provided")
        double longitude,

        @NotNull(message = "Rating must be provided")
        @DecimalMin(value = "0.0", message = "rating must be >= 0.0")
        @DecimalMax(value = "5.0", message = "rating must be <= 5.0")
        BigDecimal rating,

        String description
) {
}
