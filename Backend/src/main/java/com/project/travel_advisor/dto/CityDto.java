package com.project.travel_advisor.dto;

import com.project.travel_advisor.entity.Cuisine;

import java.util.List;

public record CityDto(
        Long id,

        String name,

        String imageUrl,

        String description,

        List<Cuisine> cuisines
) {
}
