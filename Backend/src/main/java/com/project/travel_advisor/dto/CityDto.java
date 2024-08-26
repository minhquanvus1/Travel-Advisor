package com.project.travel_advisor.dto;

import com.project.travel_advisor.entity.Cuisine;
import com.project.travel_advisor.entity.TravelAdvice;
import jakarta.validation.constraints.NotBlank;

import java.util.List;
import java.util.Set;

public record CityDto(
        Long id,

        @NotBlank(message = "city name is mandatory")
        String name,

        @NotBlank(message = "city imageUrl is mandatory")
        String imageUrl,

        @NotBlank(message = "city description is mandatory")
        String description,

        Set<Cuisine> cuisines,

        TravelAdvice travelAdvice
) {
}
