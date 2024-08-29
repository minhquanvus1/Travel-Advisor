package com.project.travel_advisor.dto;

import com.project.travel_advisor.entity.Subcategory;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;

import java.util.Set;

public record CategoryRequestDto(
        Long id,

        @NotBlank(message = "Category name is mandatory")
        String name,

        Set<@Valid Subcategory> subcategories
) {
}
