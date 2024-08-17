package com.project.travel_advisor.service.city;

import com.project.travel_advisor.entity.City;
import com.project.travel_advisor.exception.ResourceNotFoundException;
import com.project.travel_advisor.repository.CityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CityServiceImpl implements CityService{

    private final CityRepository cityRepository;

    @Override
    public List<City> findAllCity() {
        return cityRepository.findAll();
    }

    @Override
    public City findCityById(Long id) {
        return cityRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("This City with id " + id + " does not exist"));
    }
}
