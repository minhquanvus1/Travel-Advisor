package com.project.travel_advisor.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record StopDto(

        Long id,

        @NotBlank(message = "Stop Name must be provided")
        String name,

        @NotNull(message = "Latitude must be provided")
        double latitude,

        @NotNull(message = "Longitude must be provided")
        double longitude,

        @NotBlank(message = "Stop Description must be provided")
        String description,

        boolean isAttraction,

        String imageUrl,

        String attractionName,

        Integer numberOfReviews,

        BigDecimal rating
) {
}
