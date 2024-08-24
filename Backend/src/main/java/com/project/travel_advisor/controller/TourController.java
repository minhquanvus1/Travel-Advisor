package com.project.travel_advisor.controller;

import com.project.travel_advisor.dto.TourRequestDto;
import com.project.travel_advisor.dto.TourResponseDto;
import com.project.travel_advisor.entity.Tour;
import com.project.travel_advisor.service.tour.TourService;
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
public class TourController {

    private final TourService tourService;

    @GetMapping("/tours")
    public ResponseEntity<List<TourResponseDto>> findAllTour() {
        return ResponseEntity.ok(tourService.findAllTour());
    }

    @GetMapping("/tours/{id}")
    public ResponseEntity<TourResponseDto> findTourById(@PathVariable Long id) {
        return ResponseEntity.ok(tourService.findById(id));
    }

    @PostMapping("/tours")
    public ResponseEntity<TourResponseDto> createATour(@Valid @RequestBody TourRequestDto tourRequestDto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(tourService.createATour(tourRequestDto));
    }

    @DeleteMapping("/tours/{id}")
    public ResponseEntity<Map<String, Object>> deleteATourById(@PathVariable Long id) {
        tourService.deleteATourById(id);
        Map<String, Object> response = new HashMap<>();
        response.put("deletedId", id);
        return ResponseEntity.ok(response);
    }
}
