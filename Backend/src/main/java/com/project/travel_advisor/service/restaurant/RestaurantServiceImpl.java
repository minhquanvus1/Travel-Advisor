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
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
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
    @Cacheable(value = "allRestaurants", key = "'allRestaurants'", sync = true)
    public List<RestaurantDto> findAllRestaurant() {
        return restaurantRepository.findAll().stream().map(RestaurantMapper::mapToRestaurantDto).toList();
    }

    @Override
    @Cacheable(value = "restaurant", key = "'restaurant_' + #id", sync = true)
    public RestaurantDto findRestaurantById(Long id) {
        return restaurantRepository.findById(id).map(RestaurantMapper::mapToRestaurantDto).orElseThrow(() -> new ResourceNotFoundException("This Restaurant with id " + id + " does not exist"));
    }

    @Override
    @Cacheable(value = "restaurantsInCity", key = "'cityName_' + #cityName", sync = true)
    public List<RestaurantDto> findRestaurantsInCityWithName(String cityName) {

        City foundCity = cityRepository.findCityByNameIgnoreCase(cityName).orElseThrow(() -> new ResourceNotFoundException("This city with name " + cityName + " does not exist"));

        return foundCity.getRestaurants().stream().map(RestaurantMapper::mapToRestaurantDto).toList();
    }

    @Override
    @Cacheable(value = "restaurantByName", key = "#restaurantName.toLowerCase()", sync = true)
    public RestaurantDto findRestaurantByName(String restaurantName) {

        Restaurant foundRestaurant = restaurantRepository.findRestaurantByNameIgnoreCase(restaurantName).orElseThrow(() -> new ResourceNotFoundException("This Restaurant with name " + restaurantName + " does not exist"));

        return RestaurantMapper.mapToRestaurantDto(foundRestaurant);
    }

    @Override
    @Cacheable(value = "restaurantsByName", key = "#name.toLowerCase()", sync = true)
    public List<RestaurantDto> findRestaurantsByNameContainingIgnoreCase(String name) {

        return restaurantRepository.findByNameContainingIgnoreCase(name).stream().map(RestaurantMapper::mapToRestaurantDto).toList();
    }

    @Override
    @Cacheable(value = "restaurantByRestaurantNameAndCityName", key = "#restaurantName.toLowerCase() + '_' + #cityName.toLowerCase()", sync = true)
    public RestaurantDto findRestaurantByRestaurantNameAndCityName(String restaurantName, String cityName) {

        Restaurant foundRestaurant = restaurantRepository.findRestaurantByRestaurantNameAndCityNameIgnoreCase(restaurantName, cityName).orElseThrow(() -> new ResourceNotFoundException("This Restaurant with name " + restaurantName + " does not exist in City with name " + cityName));

        return RestaurantMapper.mapToRestaurantDto(foundRestaurant);
    }

    @Override
    @Transactional
    @Caching(evict = {
            @CacheEvict(value = "restaurant", allEntries = true),
            @CacheEvict(value = "allRestaurants", allEntries = true),
            @CacheEvict(value = "restaurantByName", allEntries = true),
            @CacheEvict(value = "restaurantsByName", allEntries = true),
            @CacheEvict(value = "restaurantsInCity", allEntries = true),
            @CacheEvict(value = "restaurantByRestaurantNameAndCityName", allEntries = true)
    })
    public RestaurantDto createARestaurant(RestaurantDto restaurantDto) {
        Restaurant restaurant = RestaurantMapper.mapToRestaurant(restaurantDto);
        System.out.println("Restaurant converted is " + restaurant);
        restaurantRepository.findRestaurantByNameIgnoreCase(restaurant.getName()).ifPresent((foundRestaurant) -> {throw new BadRequestException("This Restaurant with name " + restaurant.getName() + " already exists");
        });
        addressRepository.findAddressByAddressIgnoreCase(restaurant.getAddress().getAddress()).ifPresent((foundAddress) -> {throw new BadRequestException("This Address " + restaurant.getAddress().getAddress() + " already exists");
        });
        City foundCity = cityRepository.findById(restaurantDto.cityId()).orElseThrow(() -> new ResourceNotFoundException("This Restaurant belongs to a City with id " + restaurantDto.cityId() + " does not exist"));
        restaurant.setCity(foundCity);
        foundCity.getRestaurants().add(restaurant);
        List<Cuisine> cuisines = restaurantDto.cuisines().stream().map(CuisineMapper::mapToCuisine).toList();
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

    @Override
    @Transactional
    @Caching(evict = {
            @CacheEvict(value = "restaurant", allEntries = true),
            @CacheEvict(value = "allRestaurants", allEntries = true),
            @CacheEvict(value = "restaurantByName", allEntries = true),
            @CacheEvict(value = "restaurantsByName", allEntries = true),
            @CacheEvict(value = "restaurantsInCity", allEntries = true),
            @CacheEvict(value = "restaurantByRestaurantNameAndCityName", allEntries = true)
    })
    public void deleteRestaurantById(Long id) {
        Restaurant foundRestaurant = restaurantRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("This Restaurant with id " + id + " does not exist"));

        if (foundRestaurant.getCity() != null) {
            foundRestaurant.getCity().getRestaurants().remove(foundRestaurant);
            foundRestaurant.setCity(null);
        }

        foundRestaurant.setAddress(null);

        foundRestaurant.getCuisines().forEach(cuisine -> {
            cuisine.getRestaurants().remove(foundRestaurant);
            if (cuisine.getRestaurants().isEmpty()) {
                cuisineRepository.delete(cuisine);
            }
        });
        foundRestaurant.setCuisines(null);

        restaurantRepository.delete(foundRestaurant);

    }
}