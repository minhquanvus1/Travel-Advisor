package com.project.travel_advisor.controller;

import com.project.travel_advisor.dto.RestaurantDto;
import com.project.travel_advisor.entity.Restaurant;
import com.project.travel_advisor.service.restaurant.RestaurantService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class RestaurantController {

    private final RestaurantService restaurantService;

    @GetMapping("/restaurants")
    public ResponseEntity<List<RestaurantDto>> findAllRestaurant() {
        return ResponseEntity.ok(restaurantService.findAllRestaurant());
    }

    @GetMapping("/restaurants/{id}")
    public ResponseEntity<RestaurantDto> findRestaurantById(@PathVariable Long id) {
        return ResponseEntity.ok(restaurantService.findRestaurantById(id));
    }

    @PostMapping("/restaurants")
    public ResponseEntity<RestaurantDto> createARestaurant(@RequestBody RestaurantDto restaurantDto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(restaurantService.createARestaurant(restaurantDto));
    }

    @DeleteMapping("/restaurants/{id}")
    public ResponseEntity<Map<String,Object>> deleteRestaurantById(@PathVariable Long id) {
        restaurantService.deleteRestaurantById(id);
        Map<String, Object> response = new HashMap<>();
        response.put("deletedId", id);
        return ResponseEntity.ok(response);
    }
}
