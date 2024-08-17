package com.project.travel_advisor.service.restaurant;

import com.project.travel_advisor.entity.Restaurant;
import com.project.travel_advisor.exception.ResourceNotFoundException;
import com.project.travel_advisor.repository.RestaurantRepository;
import com.project.travel_advisor.service.restaurant.RestaurantService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RestaurantServiceImpl implements RestaurantService {

    private final RestaurantRepository restaurantRepository;

    @Override
    public List<Restaurant> findAllRestaurant() {
        return restaurantRepository.findAll();
    }

    @Override
    public Restaurant findRestaurantById(Long id) {
        return restaurantRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("This Restaurant with id " + id + " does not exist"));
    }
}
