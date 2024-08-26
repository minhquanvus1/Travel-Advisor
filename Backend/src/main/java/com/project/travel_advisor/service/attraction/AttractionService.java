package com.project.travel_advisor.service.attraction;

import com.project.travel_advisor.dto.AttractionDto;

import java.util.List;

public interface AttractionService {

    List<AttractionDto> findAllAttractions();

    AttractionDto findAttractionById(Long id);

    List<AttractionDto> findAttractionsInCityWithName(String cityName);

    AttractionDto createAnAttraction(AttractionDto attractionDto);

    void deleteAttractionById(Long id);
}
