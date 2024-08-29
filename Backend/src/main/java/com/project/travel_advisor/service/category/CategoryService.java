package com.project.travel_advisor.service.category;

import com.project.travel_advisor.dto.CategoryResponseDto;
import com.project.travel_advisor.dto.CategoryRequestDto;

import java.util.List;

public interface CategoryService {

    List<CategoryResponseDto> getAllCategory();

    CategoryResponseDto getCategoryById(Long id);

    CategoryResponseDto createACategory(CategoryRequestDto categoryRequestDto);

    void deleteACategory(Long categoryId);

    void deleteAllCategory();

    CategoryResponseDto updateACategory(CategoryRequestDto categoryRequestDto, Long id);

}
