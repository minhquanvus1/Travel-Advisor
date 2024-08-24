package com.project.travel_advisor.dto;

import com.project.travel_advisor.entity.Address;

import java.math.BigDecimal;
import java.util.List;

public record RestaurantDto(
        Long id,

        Long cityId,
        String name,
        String imageUrl,

         String websiteUrl,

        String phoneNumber,

        String description,

        BigDecimal lowestPrice,

        BigDecimal highestPrice,

        int numberOfReviews,

        BigDecimal rating,

        Address addressObj,
        List<CuisineDto> cuisineDtos
) {
}
