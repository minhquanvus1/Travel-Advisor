package com.project.travel_advisor.mapper;

import com.project.travel_advisor.dto.SubcategoryDto;
import com.project.travel_advisor.entity.Subcategory;

import java.util.ArrayList;

public class SubcategoryMapper {

    public static SubcategoryDto mapToSubcategoryDto(Subcategory subcategory) {
        return new SubcategoryDto(
                subcategory.getId(),
                subcategory.getName(),
                subcategory.getCategory() != null ? subcategory.getCategory().getId() : null
        );
    }

    public static Subcategory mapToSubcategory(SubcategoryDto subcategoryDto) {
        return Subcategory
                .builder()
                .id(subcategoryDto.id())
                .name(subcategoryDto.name())
                .attractions(new ArrayList<>())
                .tours(new ArrayList<>())
                .category(null)
                .build();
    }
}
