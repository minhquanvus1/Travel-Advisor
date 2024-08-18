package com.project.travel_advisor.mapper;

import com.project.travel_advisor.dto.CuisineDto;
import com.project.travel_advisor.entity.Cuisine;

import java.util.ArrayList;

public class CuisineMapper {

    public static Cuisine mapToCuisine(CuisineDto cuisineDto) {
        return Cuisine.builder().id(cuisineDto.id()).name(cuisineDto.name()).restaurants(new ArrayList<>()).build();
    }

    public static CuisineDto mapToCuisineDto(Cuisine cuisine) {
        return new CuisineDto(cuisine.getId(), cuisine.getName());
    }
}
