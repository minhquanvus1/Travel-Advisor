package com.project.travel_advisor.mapper;

import com.project.travel_advisor.dto.CategoryResponseDto;
import com.project.travel_advisor.dto.CategoryRequestDto;
import com.project.travel_advisor.entity.Category;

import java.util.HashSet;

public class CategoryMapper {

    public static CategoryResponseDto mapToCategoryDto(Category category) {
        return new CategoryResponseDto(category.getId(), category.getName());
    }

    public static Category mapToCategory(CategoryRequestDto categoryRequestDto) {
        return Category
                .builder()
                .id(categoryRequestDto.id())
                .name(categoryRequestDto.name())
                .subcategories(new HashSet<>())
                .build();
    }
}
