package com.project.travel_advisor.mapper;

import com.project.travel_advisor.dto.TourRequestDto;
import com.project.travel_advisor.dto.TourResponseDto;
import com.project.travel_advisor.entity.Day;
import com.project.travel_advisor.entity.Stop;
import com.project.travel_advisor.entity.Tour;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;

public class TourMapper {

    public static Tour mapToTour(TourRequestDto tourRequestDto) {
        List<Stop> stopsList = new ArrayList<>();
        for (Day day : tourRequestDto.days()) {
            stopsList.addAll(day.getStops());
        }
        return Tour
                .builder()
                .name(tourRequestDto.name())
                .maxGroupSize(tourRequestDto.maxGroupSize())
                .duration(tourRequestDto.duration())
                .minAge(tourRequestDto.minAge())
                .maxAge(tourRequestDto.maxAge())
                .price(tourRequestDto.price())
                .description(tourRequestDto.description())
                .numberOfReviews(tourRequestDto.numberOfReviews())
                .rating(tourRequestDto.rating())
                .days(tourRequestDto.days())
                .stops(stopsList)
                .highlights(tourRequestDto.highlights())
                .languages(new HashSet<>())
                .tourDetail(tourRequestDto.tourDetail())
                .tourImages(tourRequestDto.tourImages())
                .build();
    }

    public static TourResponseDto mapToTourResponseDto(Tour tour) {
        return new TourResponseDto(
                tour.getId(),
                tour.getName(),
                tour.getCity().getId(),
                tour.getSubcategory().getId(),
                tour.getNumberOfReviews(),
                TourImageMapper.mapToTourImageObjectDto(tour.getTourImages()),
                tour.getLanguages().stream().map(LanguageMapper::mapToLanguageDto).collect(Collectors.toSet()),
                tour.getMinAge(),
                tour.getMaxAge(),
                tour.getMaxGroupSize(),
                tour.getDuration(),
                tour.getPrice(),
                tour.getRating(),
                tour.getHighlights().stream().map(HighlightMapper::mapToHighlightDto).toList(),
                tour.getDescription(),
                TourDetailMapper.mapToTourDetailDto(tour.getTourDetail())
        );
    }
}
