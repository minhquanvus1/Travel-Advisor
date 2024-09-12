package com.project.travel_advisor.repository;

import com.project.travel_advisor.entity.Subcategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SubcategoryRepository extends JpaRepository<Subcategory, Long> {

    Optional<Subcategory> findSubCategoryByNameIgnoreCase(String subcategoryName);

    List<Subcategory> findByNameContainingIgnoreCase(String name);
}
