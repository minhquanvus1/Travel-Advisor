package com.project.travel_advisor.dto;

import com.project.travel_advisor.entity.Address;

import java.math.BigDecimal;

public record AttractionDto(
        Long id,

        String name,

        Long subcategoryId,

        String subcategoryName,

        Long cityId,

        int numberOfReviews,

        String imageUrl,

        String websiteUrl,

        Address addressObj,

        double latitude,

        double longitude,

        BigDecimal rating,

        String description
) {
}
