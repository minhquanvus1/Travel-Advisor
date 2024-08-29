package com.project.travel_advisor.controller;

import com.project.travel_advisor.dto.SubcategoryDto;
import com.project.travel_advisor.entity.Subcategory;
import com.project.travel_advisor.service.subcategory.SubcategoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class SubcategoryController {

    private final SubcategoryService subcategoryService;

    @GetMapping("/subcategories")
    public ResponseEntity<List<SubcategoryDto>> findAllSubcategory() {
        return ResponseEntity.ok(subcategoryService.findAllSubcategory());
    }

    @GetMapping("/subcategories/{id}")
    public ResponseEntity<SubcategoryDto> findSubcategoryById(@PathVariable Long id) {
        return ResponseEntity.ok(subcategoryService.findSubcategoryById(id));
    }

    @GetMapping("/categories/{categoryName}/subcategories")
    public ResponseEntity<List<SubcategoryDto>> findSubcategoriesOfCategoryWithName(@PathVariable String categoryName) {
        return ResponseEntity.ok(subcategoryService.findSubcategoriesOfCategoryWithName(categoryName));
    }

    @PostMapping("/subcategories")
    public ResponseEntity<SubcategoryDto> createASubcategory(@Valid @RequestBody SubcategoryDto subcategoryDto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(subcategoryService.createASubcategory(subcategoryDto));
    }

    @DeleteMapping("/subcategories/{id}")
    public ResponseEntity<Map<String, Object>> deleteSubcategoryById(@PathVariable Long id) {
        subcategoryService.deleteSubcategoryById(id);
        Map<String, Object> response = new HashMap<>();
        response.put("deletedId", id);
        return ResponseEntity.ok(response);
    }
}
