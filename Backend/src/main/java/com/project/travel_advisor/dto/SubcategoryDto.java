package com.project.travel_advisor.dto;

import com.project.travel_advisor.entity.Attraction;
import com.project.travel_advisor.entity.Tour;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record SubcategoryDto(
                             Long id,

                             @NotBlank(message = "Subcategory Name must be provided")
                             String name,

                             @NotNull(message = "CategoryId must be provided")
                             @Min(value = 0, message = "CategoryId must be >= 0")
                             Long categoryId
                             ) {


}
