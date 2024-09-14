package com.project.travel_advisor.dto;

import com.project.travel_advisor.entity.Address;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;

import java.math.BigDecimal;

public record AttractionResponseDto(
        Long id,

        String name,

        Long subcategoryId,

        String subcategoryName,

        Long cityId,

        String cityName,

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
