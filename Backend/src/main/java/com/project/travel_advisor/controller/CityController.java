package com.project.travel_advisor.controller;

import com.project.travel_advisor.entity.City;
import com.project.travel_advisor.service.city.CityService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class CityController {

    private final CityService cityService;

    @GetMapping("/cities")
    public ResponseEntity<List<City>> findAllCity() {
        return ResponseEntity.ok(cityService.findAllCity());
    }

    @GetMapping("/cities/{id}")
    public ResponseEntity<City> findCityById(@PathVariable Long id) {
        return ResponseEntity.ok(cityService.findCityById(id));
    }
}
