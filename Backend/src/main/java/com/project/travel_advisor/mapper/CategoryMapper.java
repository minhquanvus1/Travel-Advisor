package com.project.travel_advisor.mapper;

import com.project.travel_advisor.dto.CategoryDto;
import com.project.travel_advisor.entity.Category;

public class CategoryMapper {

    public static CategoryDto mapToCategoryDto(Category category) {
        return new CategoryDto(category.getId(), category.getName());
    }
}
