package com.project.travel_advisor.service.restaurant;

import com.project.travel_advisor.dto.RestaurantDto;
import com.project.travel_advisor.entity.Restaurant;

import java.util.List;

public interface RestaurantService {

    List<RestaurantDto> findAllRestaurant();

    RestaurantDto findRestaurantById(Long id);

    RestaurantDto createARestaurant(RestaurantDto restaurantDto);

    void deleteRestaurantById(Long id);
}
