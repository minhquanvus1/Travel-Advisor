package com.project.travel_advisor.dto;

import jakarta.validation.constraints.*;

import java.math.BigDecimal;

public record AttractionReviewRequestDto(

        @NotBlank(message = "Review title must be provided")
        @Size(max = 255, message = "Review Title must be <= 255 characters ")
        String title,

        String description,

        @NotNull(message = "Rating must be provided")
        @DecimalMin(value = "0.0", message = "rating must be >= 0.0")
        @DecimalMax(value = "5.0", message = "rating must be <= 5.0")
        BigDecimal rating,

        @NotNull(message = "attractionId must be provided")
        @Min(value = 0, message = "attractionId must be >= 0")
        Long attractionId,

        @NotNull(message = "userId must be provided")
        @Min(value = 0, message = "userId must be >= 0")
        Long userId
) {
}
