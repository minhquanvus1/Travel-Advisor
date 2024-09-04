package com.project.travel_advisor.dto;

import com.fasterxml.jackson.annotation.JsonInclude;

import java.math.BigDecimal;
import java.time.LocalDate;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record AttractionReviewResponseDto(

        Long id,

        String reviewTitle,

        String description,

        BigDecimal rating,

        LocalDate reviewDate,

        UserDto user,

        String attractionName
) {
}
