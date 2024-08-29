package com.project.travel_advisor.controller;

import com.project.travel_advisor.dto.CategoryResponseDto;
import com.project.travel_advisor.dto.CategoryRequestDto;
import com.project.travel_advisor.service.category.CategoryService;
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
public class CategoryController {

    private final CategoryService categoryService;

    @GetMapping("/categories")
    public ResponseEntity<List<CategoryResponseDto>> getAllCategory() {
        return ResponseEntity.ok(categoryService.getAllCategory());
    }

    @GetMapping("/categories/{id}")
    public ResponseEntity<CategoryResponseDto> getCategoryById(@PathVariable Long id) {
        return ResponseEntity.ok(categoryService.getCategoryById(id));
    }

    @PostMapping("/categories")
    public ResponseEntity<CategoryResponseDto> createACategory(@Valid @RequestBody CategoryRequestDto categoryRequestDto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(categoryService.createACategory(categoryRequestDto));
    }

    @PutMapping("/categories/{id}")
    public ResponseEntity<CategoryResponseDto> updateACategory(@Valid @RequestBody CategoryRequestDto categoryRequestDto, @PathVariable Long id) {
        return ResponseEntity.ok(categoryService.updateACategory(categoryRequestDto, id));
    }

    @DeleteMapping("/categories/{id}")
    public ResponseEntity<Map<String, Object>> deleteACategory(@PathVariable Long id) {
        categoryService.deleteACategory(id);
        Map<String, Object> response = new HashMap<>();
        response.put("deletedId", id);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/categories")
    public ResponseEntity<String> deleteAllCategory() {
        categoryService.deleteAllCategory();
        return ResponseEntity.ok("All Category has been successfully deleted");
    }
}
