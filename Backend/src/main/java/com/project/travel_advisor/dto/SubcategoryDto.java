package com.project.travel_advisor.dto;

import com.project.travel_advisor.entity.Attraction;
import com.project.travel_advisor.entity.Tour;

import java.util.List;

public record SubcategoryDto(Long id,

                             String name,

                             Long categoryId
                             ) {


}
