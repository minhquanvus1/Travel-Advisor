package com.project.travel_advisor.service.subcategory;

import com.project.travel_advisor.dto.SubcategoryDto;
import com.project.travel_advisor.entity.Category;
import com.project.travel_advisor.entity.Subcategory;
import com.project.travel_advisor.exception.BadRequestException;
import com.project.travel_advisor.exception.ResourceNotFoundException;
import com.project.travel_advisor.mapper.SubcategoryMapper;
import com.project.travel_advisor.repository.CategoryRepository;
import com.project.travel_advisor.repository.LanguageRepository;
import com.project.travel_advisor.repository.SubcategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SubcategoryServiceImpl implements SubcategoryService{

    private final SubcategoryRepository subcategoryRepository;

    private final CategoryRepository categoryRepository;

    private final LanguageRepository languageRepository;

    @Override
    public SubcategoryDto createASubcategory(SubcategoryDto subcategoryDto) {
        Optional<Subcategory> foundSubcategory = subcategoryRepository.findSubCategoryByNameIgnoreCase(subcategoryDto.name());
        if (foundSubcategory.isPresent()) {
            throw new BadRequestException("This Subcategory " + subcategoryDto.name() + " already exists");
        }
        Category foundCategory = categoryRepository.findById(subcategoryDto.categoryId()).orElseThrow(() -> new ResourceNotFoundException("This Subcategory belongs to a Category with id " + subcategoryDto.categoryId() + " does not exist"));
        Subcategory subcategory = SubcategoryMapper.mapToSubcategory(subcategoryDto);
        foundCategory.addSubcategories(Set.of(subcategory));
        return SubcategoryMapper.mapToSubcategoryDto(subcategoryRepository.save(subcategory));
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

    @Override
    public List<SubcategoryDto> findSubcategoriesByNameContainingIgnoreCase(String name) {

        return subcategoryRepository.findByNameContainingIgnoreCase(name).stream().map(SubcategoryMapper::mapToSubcategoryDto).toList();
    }

    @Override
    @Transactional
    public void deleteSubcategoryById(Long id) {
        Subcategory foundSubcategory = subcategoryRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("This Subcategory with id " + id + " does not exist"));
        Category foundCategory = categoryRepository.findById(foundSubcategory.getCategory().getId()).get();

        foundSubcategory.getAttractions().clear();

        foundSubcategory.getTours().forEach(tour -> {tour.getLanguages().forEach(language -> {language.getTours().remove(tour); if(language.getTours().isEmpty()) {languageRepository.delete(language);}});
        tour.getLanguages().clear();});
        foundSubcategory.getTours().clear();

        foundSubcategory.setCategory(null);
        foundCategory.getSubcategories().remove(foundSubcategory);

        subcategoryRepository.delete(foundSubcategory);
    }
}
