package com.project.travel_advisor.controller;

import com.project.travel_advisor.dto.CityDto;
import com.project.travel_advisor.service.city.CityService;
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
public class CityController {

    private final CityService cityService;

    @GetMapping("/cities")
    public ResponseEntity<List<CityDto>> findAllCity() {
        return ResponseEntity.ok(cityService.findAllCity());
    }

    @GetMapping("/cities/{id}")
    public ResponseEntity<CityDto> findCityById(@PathVariable Long id) {
        return ResponseEntity.ok(cityService.findCityById(id));
    }

    @GetMapping("/cities/search")
    public ResponseEntity<CityDto> findCityByName(@RequestParam String name) {
        return ResponseEntity.ok(cityService.findCityByName(name));
    }

    @GetMapping("/cities/search/findByNameContainingIgnoreCase")
    public ResponseEntity<List<CityDto>> findCitiesByNameContainingIgnoreCase(@RequestParam String name) {
        return ResponseEntity.ok(cityService.findCitiesByNameContainingIgnoreCase(name));
    }

    @PostMapping("/secure/cities")
    @PreAuthorize("hasAuthority('post:city')")
    public ResponseEntity<CityDto> createACity(@Valid @RequestBody CityDto cityDto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(cityService.createACity(cityDto));
    }

    @DeleteMapping("/secure/cities/{id}")
    @PreAuthorize("hasAuthority('delete:city')")
    public ResponseEntity<Map<String, Object>> deleteCityById(@PathVariable Long id) {
        cityService.deleteACityById(id);
        Map<String, Object> response = new HashMap<>();
        response.put("deletedId", id);
        return ResponseEntity.ok(response);
    }
}
