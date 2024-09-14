package com.project.travel_advisor.dto;

import com.project.travel_advisor.entity.Address;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;

import java.math.BigDecimal;

public record AttractionRequestDto(

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

        String imageUrl,

        String websiteUrl,

        @Valid
        Address addressObj,

        @NotNull(message = "latitude must be provided")
        double latitude,

        @NotNull(message = "longitude must be provided")
        double longitude,

        String description
) {
}
