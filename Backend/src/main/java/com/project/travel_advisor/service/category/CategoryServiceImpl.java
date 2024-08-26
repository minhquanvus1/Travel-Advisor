package com.project.travel_advisor.service.category;

import com.project.travel_advisor.dto.CategoryDto;
import com.project.travel_advisor.entity.Category;
import com.project.travel_advisor.entity.Subcategory;
import com.project.travel_advisor.exception.BadRequestException;
import com.project.travel_advisor.exception.ResourceNotFoundException;
import com.project.travel_advisor.mapper.CategoryMapper;
import com.project.travel_advisor.repository.CategoryRepository;
import com.project.travel_advisor.repository.SubcategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService{

    private final CategoryRepository categoryRepository;

    private final SubcategoryRepository subcategoryRepository;

    @Override
    public List<CategoryDto> getAllCategory() {

        return categoryRepository.findAll().stream().map(CategoryMapper::mapToCategoryDto).toList();
    }

    @Override
    public CategoryDto getCategoryById(Long id) {
        return categoryRepository.findById(id).map(CategoryMapper::mapToCategoryDto).orElseThrow(() -> new ResourceNotFoundException("This Category with id " + id + " does not exist"));
    }

    @Override
    public Category createACategory(Category category) {
        Optional<Category> foundCategory = categoryRepository.findCategoryByNameIgnoreCase(category.getName());
        if (foundCategory.isPresent()) {
            throw new BadRequestException("This Category " + category.getName() + " already exists");
        }
        // Set the category reference in each subcategory
//        if (category.getSubcategories() != null) {
//            category.getSubcategories().forEach(subcategory -> subcategory.setCategory(category));
//        }
        checkSubcategoriesList(category.getSubcategories());
        category.addSubcategories(category.getSubcategories());
        return categoryRepository.save(category);
    }

    @Override
    public void deleteACategory(Long categoryId) {
        Category foundCategory = categoryRepository.findById(categoryId).orElseThrow(() -> new ResourceNotFoundException("This Category with id " + categoryId + " does not exist"));
        categoryRepository.delete(foundCategory);
    }

    @Override
    public void deleteAllCategory() {
        categoryRepository.deleteAll();
    }

    @Override
    public Category updateACategory(Category category, Long id) {
        Category foundCategory = categoryRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("This Category with id " + id + " does not exist"));
        if (category.getName() == null || category.getName().isBlank()) {
            throw new BadRequestException("Category name can not be null");
        }
        foundCategory.setName(category.getName());
        if (category.getSubcategories() != null) {
            foundCategory.replaceSubcategories(category.getSubcategories());
        }
        return categoryRepository.save(foundCategory);
    }

    public void checkSubcategoriesList(Set<Subcategory> subcategories) {
        for (Subcategory subcategory : subcategories) {
            Optional<Subcategory> foundSubcategory = subcategoryRepository.findSubCategoryByName(subcategory.getName());
            if (foundSubcategory.isPresent()) {
                throw new BadRequestException("This Subcategory " + subcategory.getName() + " already exists");
            }
        }
    }
}
