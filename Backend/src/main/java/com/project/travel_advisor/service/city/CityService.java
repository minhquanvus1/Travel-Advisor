package com.project.travel_advisor.service.city;

import com.project.travel_advisor.dto.CityDto;
import com.project.travel_advisor.entity.City;

import java.util.List;

public interface CityService {

    List<CityDto> findAllCity();

    CityDto findCityById(Long id);

    CityDto findCityByName(String name);

    List<CityDto> findCitiesByNameContainingIgnoreCase(String name);

    CityDto createACity(CityDto cityDto);

    void deleteACityById(Long id);
}
