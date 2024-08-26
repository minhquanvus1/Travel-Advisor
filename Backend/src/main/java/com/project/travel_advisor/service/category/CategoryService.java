package com.project.travel_advisor.service.category;

import com.project.travel_advisor.dto.CategoryDto;
import com.project.travel_advisor.entity.Category;

import java.util.List;

public interface CategoryService {

    List<CategoryDto> getAllCategory();

    CategoryDto getCategoryById(Long id);

    Category createACategory(Category category);

    void deleteACategory(Long categoryId);

    void deleteAllCategory();

    Category updateACategory(Category category, Long id);

}
