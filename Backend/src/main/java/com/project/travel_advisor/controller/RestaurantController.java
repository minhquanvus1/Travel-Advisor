package com.project.travel_advisor.controller;

import com.project.travel_advisor.entity.Restaurant;
import com.project.travel_advisor.service.restaurant.RestaurantService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class RestaurantController {

    private final RestaurantService restaurantService;

    @GetMapping("/restaurants")
    public ResponseEntity<List<Restaurant>> findAllRestaurant() {
        return ResponseEntity.ok(restaurantService.findAllRestaurant());
    }

    @GetMapping("/restaurants/{id}")
    public ResponseEntity<Restaurant> findRestaurantById(@PathVariable Long id) {
        return ResponseEntity.ok(restaurantService.findRestaurantById(id));
    }
}
