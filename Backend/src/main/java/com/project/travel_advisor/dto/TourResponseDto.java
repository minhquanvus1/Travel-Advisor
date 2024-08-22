package com.project.travel_advisor.dto;

import com.project.travel_advisor.entity.Highlight;
import com.project.travel_advisor.entity.Language;

import java.math.BigDecimal;
import java.util.List;

public record TourResponseDto(
        Long id,

        String name,

        Long cityId,

        Long subcategoryId,

        int numberOfReviews,

        TourImageObjectDto imageObject,

        List<LanguageDto> languages,

        int minAge,

        int maxAge,

        int maxGroupSize,

        double duration,

        BigDecimal price,

        BigDecimal rating,

        List<HighlightDto> highlights,

        String description,

        TourDetailDto tourDetail
) {
}
