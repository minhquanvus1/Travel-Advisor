package com.project.travel_advisor.dto;

import com.project.travel_advisor.entity.DepartureAndReturn;

import java.util.List;

public record TourDetailDto(

        List<String> included,

        List<String> notIncluded,

        String whatToExpect,

        List<String> additionalInformation,

        List<String> accessibility,

        DepartureAndReturn departureAndReturn
) {
}
