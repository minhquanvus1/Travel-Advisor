package com.project.travel_advisor.service.restaurant;

import com.project.travel_advisor.dto.RestaurantDto;
import com.project.travel_advisor.entity.City;
import com.project.travel_advisor.entity.Cuisine;
import com.project.travel_advisor.entity.Restaurant;
import com.project.travel_advisor.exception.BadRequestException;
import com.project.travel_advisor.exception.ResourceNotFoundException;
import com.project.travel_advisor.mapper.CuisineMapper;
import com.project.travel_advisor.mapper.RestaurantMapper;
import com.project.travel_advisor.repository.AddressRepository;
import com.project.travel_advisor.repository.CityRepository;
import com.project.travel_advisor.repository.CuisineRepository;
import com.project.travel_advisor.repository.RestaurantRepository;
import com.project.travel_advisor.service.restaurant.RestaurantService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RestaurantServiceImpl implements RestaurantService {

    private final RestaurantRepository restaurantRepository;

    private final CityRepository cityRepository;

    private final CuisineRepository cuisineRepository;

    private final AddressRepository addressRepository;

    @Override
    public List<RestaurantDto> findAllRestaurant() {
        return restaurantRepository.findAll().stream().map(RestaurantMapper::mapToRestaurantDto).toList();
    }

    @Override
    public RestaurantDto findRestaurantById(Long id) {
        return restaurantRepository.findById(id).map(RestaurantMapper::mapToRestaurantDto).orElseThrow(() -> new ResourceNotFoundException("This Restaurant with id " + id + " does not exist"));
    }

    @Override
    @Transactional
    public RestaurantDto createARestaurant(RestaurantDto restaurantDto) {
        Restaurant restaurant = RestaurantMapper.mapToRestaurant(restaurantDto);
        System.out.println("Restaurant converted is " + restaurant);
        restaurantRepository.findRestaurantByNameIgnoreCase(restaurant.getName()).ifPresent((foundRestaurant) -> {throw new BadRequestException("This Restaurant with name " + restaurant.getName() + " already exist");
        });
        addressRepository.findAddressByAddressIgnoreCase(restaurant.getAddress().getAddress()).ifPresent((foundAddress) -> {throw new BadRequestException("This Restaurant with Address " + restaurant.getAddress() + " already exist");
        });
        City foundCity = cityRepository.findById(restaurantDto.cityId()).orElseThrow(() -> new ResourceNotFoundException("This Restaurant belongs to a City with id " + restaurantDto.cityId() + " does not exist"));
        restaurant.setCity(foundCity);
        foundCity.getRestaurants().add(restaurant);
        List<Cuisine> cuisines = restaurantDto.cuisineDtos().stream().map(CuisineMapper::mapToCuisine).toList();
        for (Cuisine cuisine : cuisines) {
            Optional<Cuisine> foundCuisine = cuisineRepository.findCuisineByNameIgnoreCase(cuisine.getName());

            if (foundCuisine.isPresent()) {
                // Existing cuisine found - associate it with the restaurant
                Cuisine existingCuisine = foundCuisine.get();
                existingCuisine.addRestaurant(restaurant);
                restaurant.getCuisines().add(existingCuisine);  // Add existing cuisine to the restaurant
            } else {
                // New cuisine - add it to the restaurant and save it
                cuisine.addRestaurant(restaurant);
                restaurant.getCuisines().add(cuisine);
                cuisineRepository.save(cuisine);
            }

        }
        Restaurant savedRestaurant = restaurantRepository.save(restaurant);
        System.out.println("saved restaurant is " + savedRestaurant);
        return RestaurantMapper.mapToRestaurantDto(savedRestaurant);
    }
}