package com.project.travel_advisor.service.attraction;

import com.project.travel_advisor.dto.AttractionDto;
import com.project.travel_advisor.entity.Attraction;

import java.util.List;

public interface AttractionService {

    List<AttractionDto> findAllAttractions();

    AttractionDto findAttractionById(Long id);

    AttractionDto createAnAttraction(AttractionDto attractionDto);

    void deleteAttractionById(Long id);
}
