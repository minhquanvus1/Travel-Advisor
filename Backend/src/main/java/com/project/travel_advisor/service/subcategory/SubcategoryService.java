package com.project.travel_advisor.service.subcategory;

import com.project.travel_advisor.dto.SubcategoryDto;
import com.project.travel_advisor.entity.Subcategory;

import java.util.List;

public interface SubcategoryService {

    Subcategory createASubcategory(Subcategory subcategory);

    List<SubcategoryDto> findAllSubcategory();

    SubcategoryDto findSubcategoryById(Long id);

    List<SubcategoryDto> findSubcategoriesOfCategoryWithName(String categoryName);
}
