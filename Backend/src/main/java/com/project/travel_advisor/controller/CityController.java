package com.project.travel_advisor.controller;

import com.project.travel_advisor.dto.CityDto;
import com.project.travel_advisor.entity.City;
import com.project.travel_advisor.service.city.CityService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    @PostMapping("/cities")
    public ResponseEntity<CityDto> createACity(@RequestBody CityDto cityDto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(cityService.createACity(cityDto));
    }

    @DeleteMapping("/cities/{id}")
    public ResponseEntity<Map<String, Object>> deleteCityById(@PathVariable Long id) {
        cityService.deleteACityById(id);
        Map<String, Object> response = new HashMap<>();
        response.put("deletedId", id);
        return ResponseEntity.ok(response);
    }
}
