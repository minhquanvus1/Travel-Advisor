package com.project.travel_advisor.mapper;

import com.project.travel_advisor.dto.RestaurantDto;
import com.project.travel_advisor.entity.Restaurant;

import java.util.ArrayList;


public class RestaurantMapper {

    public static Restaurant mapToRestaurant(RestaurantDto restaurantDto) {
            return Restaurant
                    .builder()
                    .id(restaurantDto.id())
                    .name(restaurantDto.name())
                    .address(restaurantDto.addressObj())
                    .imageUrl(restaurantDto.imageUrl())
                    .websiteUrl(restaurantDto.websiteUrl())
                    .lowestPrice(restaurantDto.lowestPrice())
                    .highestPrice(restaurantDto.highestPrice())
                    .description(restaurantDto.description())
                    .rating(restaurantDto.rating())
                    .phoneNumber(restaurantDto.phoneNumber())
                    .numberOfReviews(restaurantDto.numberOfReviews())
                    .city(null)
                    .cuisines(new ArrayList<>())
//                    .cuisines(restaurantDto.cuisineDtos().stream().map(CuisineMapper::mapToCuisine).toList())
                    .build();
    }

    public static RestaurantDto mapToRestaurantDto(Restaurant restaurant) {
        return new RestaurantDto(
                restaurant.getId(),
                restaurant.getCity() != null ? restaurant.getCity().getId() : null,
                restaurant.getName(),
                restaurant.getImageUrl(),
                restaurant.getWebsiteUrl(),
                restaurant.getPhoneNumber(),
                restaurant.getDescription(),
                restaurant.getLowestPrice(),
                restaurant.getHighestPrice(),
                restaurant.getNumberOfReviews(),
                restaurant.getRating(),
                restaurant.getAddress(),
                restaurant.getCuisines().stream().map(CuisineMapper::mapToCuisineDto).toList()
        );

    }
}
