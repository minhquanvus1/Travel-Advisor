package com.project.travel_advisor.service.category;

import com.project.travel_advisor.entity.Category;
import com.project.travel_advisor.entity.Subcategory;
import com.project.travel_advisor.exception.BadRequestException;
import com.project.travel_advisor.exception.ResourceNotFoundException;
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
    public List<Category> getAllCategory() {

        return categoryRepository.findAll();
    }

    @Override
    public Category getCategoryById(Long id) {
        return categoryRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("This Category with id " + id + " does not exist"));
    }

    @Override
    public Category createACategory(Category category) {
        Optional<Category> foundCategory = categoryRepository.findCategoryByName(category.getName());
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
        foundCategory.setName(category.getName());
        foundCategory.replaceSubcategories(category.getSubcategories());
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
