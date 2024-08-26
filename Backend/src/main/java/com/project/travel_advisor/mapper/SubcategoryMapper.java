package com.project.travel_advisor.mapper;

import com.project.travel_advisor.dto.SubcategoryDto;
import com.project.travel_advisor.entity.Subcategory;

public class SubcategoryMapper {

    public static SubcategoryDto mapToSubcategoryDto(Subcategory subcategory) {
        return new SubcategoryDto(
                subcategory.getId(),
                subcategory.getName(),
                subcategory.getCategory() != null ? subcategory.getCategory().getId() : null
        );
    }
}
