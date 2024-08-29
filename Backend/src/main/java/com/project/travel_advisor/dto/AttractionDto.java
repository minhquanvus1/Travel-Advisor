package com.project.travel_advisor.dto;

import com.project.travel_advisor.entity.Address;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

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

        @Positive(message = "number of reviews must be a positive number")
        int numberOfReviews,

        String imageUrl,

        String websiteUrl,

        @Valid
        Address addressObj,

        double latitude,

        double longitude,

        BigDecimal rating,

        String description
) {
}
