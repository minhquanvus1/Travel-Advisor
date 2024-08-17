package com.project.travel_advisor.service.city;

import com.project.travel_advisor.entity.City;

import java.util.List;

public interface CityService {

    List<City> findAllCity();

    City findCityById(Long id);
}
