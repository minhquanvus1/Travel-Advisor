package com.project.travel_advisor.dto;

import com.project.travel_advisor.entity.Address;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Set;

public record RestaurantDto(
        Long id,

        @NotNull(message = "cityId must be provided")
        @Min(value = 0, message = "cityId must be >= 0")
        Long cityId,

        String cityName,

        @NotBlank(message = "Restaurant Name must be provided")
        String name,
        String imageUrl,

         String websiteUrl,

        String phoneNumber,

        String description,

        @DecimalMin(value = "0.0")
        BigDecimal lowestPrice,

        BigDecimal highestPrice,

        @Positive(message = "number of reviews must be a positive number")
        int numberOfReviews,

        @DecimalMin(value = "0.0", message = "rating must be >= 0.0")
        @DecimalMax(value = "5.0", message = "rating must be <= 5.0")
        BigDecimal rating,

        @Valid
        Address addressObj,
        Set< @Valid CuisineDto> cuisines
) {
}
