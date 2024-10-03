package com.project.travel_advisor.controller;

import com.project.travel_advisor.dto.AttractionRequestDto;
import com.project.travel_advisor.dto.AttractionResponseDto;
import com.project.travel_advisor.service.attraction.AttractionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class AttractionController {

    private final AttractionService attractionService;

    @GetMapping("/attractions")
    public ResponseEntity<List<AttractionResponseDto>> findAllAttractions() {
        System.out.println("All attractions are " + attractionService.findAllAttractions());
        return ResponseEntity.ok(attractionService.findAllAttractions());
    }

    @GetMapping("/attractions/{id}")
    public ResponseEntity<AttractionResponseDto> findAttractionById(@PathVariable Long id) {
        return ResponseEntity.ok(attractionService.findAttractionById(id));
    }

    @GetMapping("/cities/{cityName}/attractions")
    public ResponseEntity<List<AttractionResponseDto>> findAttractionsInCityWithName(@PathVariable String cityName) {
        return ResponseEntity.ok(attractionService.findAttractionsInCityWithName(cityName));
    }

    @GetMapping("/attractions/search/findByNameIgnoreCase")
    public ResponseEntity<AttractionResponseDto> findAttractionByNameIgnoreCase(@RequestParam String name) {
        return ResponseEntity.ok(attractionService.findAttractionByNameIgnoreCase(name));
    }

    @GetMapping("/attractions/search/findByNameContainingIgnoreCase")
    public ResponseEntity<List<AttractionResponseDto>> findAttractionsByNameContainingIgnoreCase(@RequestParam String name) {
        return ResponseEntity.ok(attractionService.findAttractionsByNameContainingIgnoreCase(name));
    }

    @GetMapping("/test-cache")
    public String testCache() {
        return attractionService.testCache();
    }
    @PostMapping("/secure/attractions")
    @PreAuthorize("hasAuthority('post:attraction')")
    public ResponseEntity<AttractionResponseDto> createAnAttraction(@Valid @RequestBody AttractionRequestDto attractionRequestDto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(attractionService.createAnAttraction(attractionRequestDto));
    }

    @DeleteMapping("/secure/attractions/{id}")
    @PreAuthorize("hasAuthority('delete:attraction')")
    public ResponseEntity<Map<String, Object>> deleteAttractionById(@PathVariable Long id) {
        attractionService.deleteAttractionById(id);
        Map<String, Object> response = new HashMap<>();
        response.put("deletedId", id);
        return ResponseEntity.ok(response);
    }
}
