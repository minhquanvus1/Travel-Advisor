package com.project.travel_advisor.repository;

import com.project.travel_advisor.entity.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {

    Optional<Restaurant> findRestaurantByNameIgnoreCase(String name);

    @Query("SELECT r from Restaurant r WHERE UPPER(r.name) = UPPER(:restaurantName) AND UPPER(r.city.name) = UPPER(:cityName)")
    Optional<Restaurant> findRestaurantByRestaurantNameAndCityNameIgnoreCase(@Param("restaurantName") String restaurantName, @Param("cityName") String cityName);

    List<Restaurant> findByNameContainingIgnoreCase(String name);
}
