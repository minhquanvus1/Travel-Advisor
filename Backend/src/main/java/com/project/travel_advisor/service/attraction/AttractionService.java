package com.project.travel_advisor.service.attraction;

import com.project.travel_advisor.dto.AttractionRequestDto;
import com.project.travel_advisor.dto.AttractionResponseDto;

import java.util.List;

public interface AttractionService {

    List<AttractionResponseDto> findAllAttractions();

    AttractionResponseDto findAttractionById(Long id);

    List<AttractionResponseDto> findAttractionsInCityWithName(String cityName);

    List<AttractionResponseDto> findAttractionsByNameContainingIgnoreCase(String name);

    AttractionResponseDto findAttractionByNameIgnoreCase(String name);

    AttractionResponseDto createAnAttraction(AttractionRequestDto attractionRequestDto);

    void deleteAttractionById(Long id);

    String testCache();
}
