package com.project.travel_advisor.service.category;

import com.project.travel_advisor.dto.CategoryResponseDto;
import com.project.travel_advisor.dto.CategoryRequestDto;
import com.project.travel_advisor.entity.Category;
import com.project.travel_advisor.entity.Subcategory;
import com.project.travel_advisor.exception.BadRequestException;
import com.project.travel_advisor.exception.ResourceNotFoundException;
import com.project.travel_advisor.mapper.CategoryMapper;
import com.project.travel_advisor.repository.CategoryRepository;
import com.project.travel_advisor.repository.LanguageRepository;
import com.project.travel_advisor.repository.SubcategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService{

    private final CategoryRepository categoryRepository;

    private final SubcategoryRepository subcategoryRepository;

    private final LanguageRepository languageRepository;

    @Override
    @Cacheable(value = "allCategories", key = "'allCategories'", sync = true)
    public List<CategoryResponseDto> getAllCategory() {

        return categoryRepository.findAll().stream().map(CategoryMapper::mapToCategoryDto).toList();
    }

    @Override
    @Cacheable(value = "category", key = "'category_' + #id", sync = true)
    public CategoryResponseDto getCategoryById(Long id) {
        System.out.println("Hit database id first");
        return categoryRepository.findById(id).map(CategoryMapper::mapToCategoryDto).orElseThrow(() -> new ResourceNotFoundException("This Category with id " + id + " does not exist"));
    }

    @Override
    @Caching(evict = {
            @CacheEvict(value = "category", allEntries = true),
            @CacheEvict(value = "allCategories", allEntries = true)
    })
    public CategoryResponseDto createACategory(CategoryRequestDto categoryRequestDto) {
        Optional<Category> foundCategory = categoryRepository.findCategoryByNameIgnoreCase(categoryRequestDto.name());
        if (foundCategory.isPresent()) {
            throw new BadRequestException("This Category " + categoryRequestDto.name() + " already exists");
        }
        Category category = CategoryMapper.mapToCategory(categoryRequestDto);
        // Set the category reference in each subcategory
        if (categoryRequestDto.subcategories() != null) {
            checkSubcategoriesList(categoryRequestDto.subcategories());
            category.addSubcategories(categoryRequestDto.subcategories());
        }

        return CategoryMapper.mapToCategoryDto(categoryRepository.save(category));
    }

    @Override
    @Transactional
    @Caching(evict = {
            @CacheEvict(value = "category", allEntries = true),
            @CacheEvict(value = "allCategories", allEntries = true)
    })
    public void deleteACategory(Long categoryId) {
        Category foundCategory = categoryRepository.findById(categoryId).orElseThrow(() -> new ResourceNotFoundException("This Category with id " + categoryId + " does not exist"));

        for(Subcategory subcategory : foundCategory.getSubcategories()) {
            subcategory.getTours().forEach(tour -> {tour.getLanguages().forEach(language -> {language.getTours().remove(tour); if(language.getTours().isEmpty()) {languageRepository.delete(language);}});
                tour.getLanguages().clear();});
        }

        foundCategory.getSubcategories().clear();
        categoryRepository.delete(foundCategory);
    }

    @Override
    @Transactional
    @Caching(evict = {
            @CacheEvict(value = "category", allEntries = true),
            @CacheEvict(value = "allCategories", allEntries = true)
    })
    public void deleteAllCategory() {
        List<Category> categoryList = categoryRepository.findAll();
        for(Category category : categoryList) {
            for(Subcategory subcategory : category.getSubcategories()) {
                subcategory.getTours().forEach(tour -> {tour.getLanguages().forEach(language -> {language.getTours().remove(tour); if(language.getTours().isEmpty()) {languageRepository.delete(language);}});
                    tour.getLanguages().clear();});
            }
            category.getSubcategories().clear();
            categoryRepository.delete(category);
        }
    }

    @Override
    @Caching(
            put = {
                    @CachePut(value = "category", key = "'category_' + #id")
            },
            evict = {
                    @CacheEvict(value = "allCategories", allEntries = true)
            }
    )
    public CategoryResponseDto updateACategory(CategoryRequestDto categoryRequestDto, Long id) {
        Category foundCategory = categoryRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("This Category with id " + id + " does not exist"));

        foundCategory.setName(categoryRequestDto.name());
        if (categoryRequestDto.subcategories() != null) {
            foundCategory.replaceSubcategories(categoryRequestDto.subcategories());
        }
        return CategoryMapper.mapToCategoryDto(categoryRepository.save(foundCategory));
    }

    public void checkSubcategoriesList(Set<Subcategory> subcategories) {
        for (Subcategory subcategory : subcategories) {
            Optional<Subcategory> foundSubcategory = subcategoryRepository.findSubCategoryByNameIgnoreCase(subcategory.getName());
            if (foundSubcategory.isPresent()) {
                throw new BadRequestException("This Subcategory " + subcategory.getName() + " already exists");
            }
        }
    }
}
