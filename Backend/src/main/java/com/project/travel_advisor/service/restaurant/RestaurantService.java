package com.project.travel_advisor.service.restaurant;

import com.project.travel_advisor.entity.Restaurant;

import java.util.List;

public interface RestaurantService {

    List<Restaurant> findAllRestaurant();

    Restaurant findRestaurantById(Long id);
}
