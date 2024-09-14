package com.project.travel_advisor.mapper;

import com.project.travel_advisor.dto.AttractionResponseDto;
import com.project.travel_advisor.dto.AttractionRequestDto;
import com.project.travel_advisor.entity.Attraction;

public class AttractionMapper {

    public static Attraction mapToAttraction(AttractionRequestDto attractionRequestDto) {
        return Attraction
                .builder()
                .name(attractionRequestDto.name())
                .city(null)
                .subcategory(null)
                .imageUrl(attractionRequestDto.imageUrl())
                .websiteUrl(attractionRequestDto.websiteUrl())
                .address(attractionRequestDto.addressObj())
                .description(attractionRequestDto.description())
                .latitude(attractionRequestDto.latitude())
                .longitude(attractionRequestDto.longitude())
                .build();
    }
}
