package com.project.travel_advisor.controller;

import com.project.travel_advisor.dto.TourRequestDto;
import com.project.travel_advisor.dto.TourResponseDto;
import com.project.travel_advisor.service.tour.TourService;
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

    @GetMapping("/cities/{cityName}/tours")
    public ResponseEntity<List<TourResponseDto>> findToursInCityWithName(@PathVariable String cityName) {
        return ResponseEntity.ok(tourService.findToursInCityWithName(cityName));
    }

    @GetMapping("/tours/search")
    public ResponseEntity<TourResponseDto> findTourByTourNameAndCityName(@RequestParam String tourName, @RequestParam String cityName) {
        return ResponseEntity.ok(tourService.findTourByTourNameAndCityName(tourName, cityName));
    }

    @PostMapping("/secure/tours")
    @PreAuthorize("hasAuthority('post:tour')")
    public ResponseEntity<TourResponseDto> createATour(@Valid @RequestBody TourRequestDto tourRequestDto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(tourService.createATour(tourRequestDto));
    }

    @DeleteMapping("/secure/tours/{id}")
    @PreAuthorize("hasAuthority('delete:tour')")
    public ResponseEntity<Map<String, Object>> deleteATourById(@PathVariable Long id) {
        tourService.deleteATourById(id);
        Map<String, Object> response = new HashMap<>();
        response.put("deletedId", id);
        return ResponseEntity.ok(response);
    }
}
