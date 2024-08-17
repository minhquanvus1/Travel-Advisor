package com.project.travel_advisor.service.city;

import com.project.travel_advisor.dto.CityDto;
import com.project.travel_advisor.entity.City;
import com.project.travel_advisor.exception.BadRequestException;
import com.project.travel_advisor.exception.ResourceNotFoundException;
import com.project.travel_advisor.mapper.CityMapper;
import com.project.travel_advisor.repository.CityRepository;
import com.project.travel_advisor.repository.CuisineRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CityServiceImpl implements CityService{

    private final CityRepository cityRepository;
    private final CuisineRepository cuisineRepository;

    @Override
    public List<CityDto> findAllCity() {
        return cityRepository.findAll().stream().map(CityMapper::mapToCityDto).toList();
    }

    @Override
    public CityDto findCityById(Long id) {
        return cityRepository.findById(id).map(CityMapper::mapToCityDto).orElseThrow(() -> new ResourceNotFoundException("This City with id " + id + " does not exist"));
    }

    @Override
    public CityDto createACity(CityDto cityDto) {
        City city = CityMapper.mapToCity(cityDto);
        System.out.println("City object is " + city.getCuisines());
        cityRepository.findCityByNameIgnoreCase(city.getName()).ifPresent((foundCity) -> {throw new BadRequestException("City with name " + city.getName() + " already exists");});
        city.getCuisines().forEach(cuisine -> cuisine.getCities().add(city));
        cityRepository.save(city);
        return CityMapper.mapToCityDto(city);
    }

    @Override
    @Transactional
    public void deleteACityById(Long id) {
        City foundCity = cityRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("This City with id " + id + " does not exist"));
        foundCity.getCuisines().forEach(cuisine -> {
            cuisine.getCities().remove(foundCity);
            System.out.println("cuisine cities is empty " + cuisine.getCities().isEmpty());
            if (cuisine.getCities().isEmpty()) {
                cuisineRepository.delete(cuisine);
            } else {
                cuisineRepository.save(cuisine);
            }
        });
        foundCity.getCuisines().clear();
        cityRepository.delete(foundCity);
    }
}
