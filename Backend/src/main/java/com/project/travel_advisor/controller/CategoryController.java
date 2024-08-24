package com.project.travel_advisor.controller;

import com.project.travel_advisor.entity.Category;
import com.project.travel_advisor.service.category.CategoryService;
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
    public ResponseEntity<List<Category>> getAllCategory() {
        return ResponseEntity.ok(categoryService.getAllCategory());
    }

    @GetMapping("/categories/{id}")
    public ResponseEntity<Category> getCategoryById(@PathVariable Long id) {
        return ResponseEntity.ok(categoryService.getCategoryById(id));
    }

    @PostMapping("/categories")
    public ResponseEntity<Category> createACategory(@RequestBody Category category) {
        return ResponseEntity.status(HttpStatus.CREATED).body(categoryService.createACategory(category));
    }

    @PutMapping("/categories/{id}")
    public ResponseEntity<Category> updateACategory(@RequestBody Category category, @PathVariable Long id) {
        return ResponseEntity.ok(categoryService.updateACategory(category, id));
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
