package com.project.travel_advisor.controller;

import com.project.travel_advisor.dto.AttractionDto;
import com.project.travel_advisor.service.attraction.AttractionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class AttractionController {

    private final AttractionService attractionService;

    @GetMapping("/attractions")
    public ResponseEntity<List<AttractionDto>> findAllAttractions() {
        return ResponseEntity.ok(attractionService.findAllAttractions());
    }

    @GetMapping("/attractions/{id}")
    public ResponseEntity<AttractionDto> findAttractionById(@PathVariable Long id) {
        return ResponseEntity.ok(attractionService.findAttractionById(id));
    }

    @GetMapping("/cities/{cityName}/attractions")
    public ResponseEntity<List<AttractionDto>> findAttractionsInCityWithName(@PathVariable String cityName) {
        return ResponseEntity.ok(attractionService.findAttractionsInCityWithName(cityName));
    }

    @PostMapping("/attractions")
    public ResponseEntity<AttractionDto> createAnAttraction(@RequestBody AttractionDto attractionDto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(attractionService.createAnAttraction(attractionDto));
    }

    @DeleteMapping("/attractions/{id}")
    public ResponseEntity<Map<String, Object>> deleteAttractionById(@PathVariable Long id) {
        attractionService.deleteAttractionById(id);
        Map<String, Object> response = new HashMap<>();
        response.put("deletedId", id);
        return ResponseEntity.ok(response);
    }
}
