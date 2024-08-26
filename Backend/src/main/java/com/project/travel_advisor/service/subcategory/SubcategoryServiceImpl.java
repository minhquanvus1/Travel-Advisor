package com.project.travel_advisor.service.subcategory;

import com.project.travel_advisor.dto.SubcategoryDto;
import com.project.travel_advisor.entity.Category;
import com.project.travel_advisor.entity.Subcategory;
import com.project.travel_advisor.exception.BadRequestException;
import com.project.travel_advisor.exception.ResourceNotFoundException;
import com.project.travel_advisor.mapper.SubcategoryMapper;
import com.project.travel_advisor.repository.CategoryRepository;
import com.project.travel_advisor.repository.SubcategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SubcategoryServiceImpl implements SubcategoryService{

    private final SubcategoryRepository subcategoryRepository;

    private final CategoryRepository categoryRepository;

    @Override
    public Subcategory createASubcategory(Subcategory subCategory) {
        Optional<Subcategory> foundSubcategory = subcategoryRepository.findSubCategoryByName(subCategory.getName());
        if (foundSubcategory.isPresent()) {
            throw new BadRequestException("This Subcategory " + subCategory.getName() + " already exists");
        }
        return subcategoryRepository.save(subCategory);
    }

    @Override
    public List<SubcategoryDto> findAllSubcategory() {
        List<Subcategory> subcategories = subcategoryRepository.findAll();
        subcategories.forEach(subcategory -> {
            if (subcategory.getCategory() == null) {
                System.out.println("Subcategory with id " + subcategory.getId() + " has no category.");
            }
        });
        return subcategories.stream()
                .map(SubcategoryMapper::mapToSubcategoryDto)
                .collect(Collectors.toList());
//        return subcategoryRepository.findAll().stream().map(SubcategoryMapper::mapToSubcategoryDto).collect(Collectors.toList());
    }

    @Override
    public SubcategoryDto findSubcategoryById(Long id) {
        return subcategoryRepository.findById(id).map(SubcategoryMapper::mapToSubcategoryDto).orElseThrow(() -> new ResourceNotFoundException("This Subcategory with id " + id + " does not exist"));
    }

    @Override
    public List<SubcategoryDto> findSubcategoriesOfCategoryWithName(String categoryName) {

        Category foundCategory = categoryRepository.findCategoryByNameIgnoreCase(categoryName).orElseThrow(() -> new ResourceNotFoundException("This Category with name " + categoryName + " does not exist"));

        return foundCategory.getSubcategories().stream().map(SubcategoryMapper::mapToSubcategoryDto).toList();
    }
}
