package com.project.travel_advisor.dto;

import com.project.travel_advisor.entity.*;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Set;

public record TourRequestDto(

        @NotBlank(message = "tour name is mandatory")
        String name,

        @NotNull(message = "cityId must be provided")
        @Min(value = 0, message = "cityId must be >= 0")
        Long cityId,

        @NotNull(message = "subcategoryId must be provided")
        @Min(value = 0, message = "subcategoryId must be >= 0")
        Long subcategoryId,

        @Min(value = 0, message = "number of reviews must be >= 0")
        int numberOfReviews,

        List<@Valid TourImage> tourImages,

        Set<@Valid Language> languages,

        @Min(value = 0, message = "minAge must be >= 0")
        int minAge,

        @Min(value = 0, message = "maxAge must be >= 0")
        int maxAge,

        @Min(value = 1, message = "maxGroupSize must be >= 1")
        int maxGroupSize,

        @Positive(message = "duration must be a positive number")
        double duration,

        @Positive(message = "price must be a positive number")
        @DecimalMin(value = "0.0", message = "price must be >= 0")
        BigDecimal price,

        @DecimalMin(value = "0.0", message = "rating must be >= 0.0")
        @DecimalMax(value = "5.0", message = "rating must be <= 5.0")
        BigDecimal rating,

        List<@Valid Highlight> highlights,

        List<@Valid Day> days,

        String description,

        @NotNull(message = "tourDetail must be provided")
        @Valid
        TourDetail tourDetail
) {
}
