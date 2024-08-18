package com.project.travel_advisor.repository;

import com.project.travel_advisor.entity.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {

    Optional<Restaurant> findRestaurantByNameIgnoreCase(String name);
}
