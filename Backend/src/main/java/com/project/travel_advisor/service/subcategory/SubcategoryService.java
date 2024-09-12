package com.project.travel_advisor.service.subcategory;

import com.project.travel_advisor.dto.SubcategoryDto;

import java.util.List;

public interface SubcategoryService {

    SubcategoryDto createASubcategory(SubcategoryDto subcategoryDto);

    List<SubcategoryDto> findAllSubcategory();

    SubcategoryDto findSubcategoryById(Long id);

    List<SubcategoryDto> findSubcategoriesOfCategoryWithName(String categoryName);

    List<SubcategoryDto> findSubcategoriesByNameContainingIgnoreCase(String name);

    void deleteSubcategoryById(Long id);
}
