package com.project.travel_advisor.mapper;

import com.project.travel_advisor.dto.CityDto;
import com.project.travel_advisor.entity.City;

import java.util.HashSet;

public class CityMapper {

    public static City mapToCity(CityDto cityDto) {
        return City.builder()
                .id(cityDto.id())
                .name(cityDto.name())
                .imageUrl(cityDto.imageUrl())
                .description(cityDto.description())
                .cuisines(new HashSet<>())
                .travelAdvice(cityDto.travelAdvice())
                .build();
    }

    public static CityDto mapToCityDto(City city) {
        return new CityDto(
                city.getId(),
                city.getName(),
                city.getImageUrl(),
                city.getDescription(),
                city.getCuisines(),
                city.getTravelAdvice()
                );
    }
}
