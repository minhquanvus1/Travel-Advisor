package com.project.travel_advisor.dto;

import java.math.BigDecimal;
import java.util.List;
import java.util.Set;

public record TourResponseDto(
        Long id,

        String name,

        Long cityId,

        String cityName,

        Long categoryId,

        String categoryName,

        Long subcategoryId,

        String subcategoryName,

        int numberOfReviews,

        TourImageObjectDto imageObject,

        Set<LanguageDto> languages,

        int minAge,

        int maxAge,

        int maxGroupSize,

        double duration,

        BigDecimal price,

        BigDecimal rating,

        List<HighlightDto> highlights,

        List<DayDto> days,

        String description,

        TourDetailDto tourDetail
) {
}
