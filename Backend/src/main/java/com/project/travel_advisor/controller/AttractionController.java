package com.project.travel_advisor.controller;

import com.project.travel_advisor.entity.Attraction;
import com.project.travel_advisor.service.attraction.AttractionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class AttractionController {

    private final AttractionService attractionService;

    @GetMapping("/attractions")
    public ResponseEntity<List<Attraction>> findAllAttractions() {
        return ResponseEntity.ok(attractionService.findAllAttractions());
    }

    @GetMapping("/attractions/{id}")
    public ResponseEntity<Attraction> findAttractionById(@PathVariable Long id) {
        return ResponseEntity.ok(attractionService.findAttractionById(id));
    }
}
