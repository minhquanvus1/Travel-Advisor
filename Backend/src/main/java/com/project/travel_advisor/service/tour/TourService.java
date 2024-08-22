package com.project.travel_advisor.service.tour;

import com.project.travel_advisor.dto.TourRequestDto;
import com.project.travel_advisor.dto.TourResponseDto;
import com.project.travel_advisor.entity.Tour;

import java.util.List;

public interface TourService {

    List<TourResponseDto> findAllTour();

    TourResponseDto findById(Long id);

    TourResponseDto createATour(TourRequestDto tourRequestDto);

    void deleteATourById(Long id);
}
