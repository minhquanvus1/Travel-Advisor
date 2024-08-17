package com.project.travel_advisor.service.attraction;

import com.project.travel_advisor.entity.Attraction;

import java.util.List;

public interface AttractionService {

    List<Attraction> findAllAttractions();

    Attraction findAttractionById(Long id);
}
