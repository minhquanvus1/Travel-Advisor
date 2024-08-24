package com.project.travel_advisor.mapper;

import com.project.travel_advisor.dto.AttractionDto;
import com.project.travel_advisor.entity.Attraction;

public class AttractionMapper {

    public static Attraction mapToAttraction(AttractionDto attractionDto) {
        return Attraction
                .builder()
                .id(attractionDto.id())
                .name(attractionDto.name())
                .city(null)
                .subcategory(null)
                .numberOfReviews(attractionDto.numberOfReviews())
                .imageUrl(attractionDto.imageUrl())
                .websiteUrl(attractionDto.websiteUrl())
                .address(attractionDto.addressObj())
                .description(attractionDto.description())
                .latitude(attractionDto.latitude())
                .longitude(attractionDto.longitude())
                .rating(attractionDto.rating())
                .build();
    }

    public static AttractionDto mapToAttractionDto(Attraction attraction) {
        return new AttractionDto(
                attraction.getId(),
                attraction.getName(),
                attraction.getSubcategory().getId(),
                attraction.getCity().getId(),
                attraction.getNumberOfReviews(),
                attraction.getImageUrl(),
                attraction.getWebsiteUrl(),
                attraction.getAddress(),
                attraction.getLatitude(),
                attraction.getLongitude(),
                attraction.getRating(),
                attraction.getDescription()
        );
    }
}
