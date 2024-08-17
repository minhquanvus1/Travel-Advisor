package com.project.travel_advisor.controller;

import com.project.travel_advisor.dto.SubcategoryDto;
import com.project.travel_advisor.entity.Subcategory;
import com.project.travel_advisor.service.subcategory.SubcategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

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
}
