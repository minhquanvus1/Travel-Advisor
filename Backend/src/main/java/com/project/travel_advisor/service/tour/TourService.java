package com.project.travel_advisor.service.tour;

import com.project.travel_advisor.dto.TourRequestDto;
import com.project.travel_advisor.dto.TourResponseDto;

import java.util.List;

public interface TourService {

    List<TourResponseDto> findAllTour();

    TourResponseDto findById(Long id);

    List<TourResponseDto> findToursInCityWithName(String cityName);

    TourResponseDto createATour(TourRequestDto tourRequestDto);

    void deleteATourById(Long id);
}
