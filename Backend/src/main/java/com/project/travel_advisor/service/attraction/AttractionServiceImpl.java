package com.project.travel_advisor.service.attraction;

import com.project.travel_advisor.dto.AttractionDto;
import com.project.travel_advisor.entity.Attraction;
import com.project.travel_advisor.entity.City;
import com.project.travel_advisor.entity.Subcategory;
import com.project.travel_advisor.exception.BadRequestException;
import com.project.travel_advisor.exception.ResourceNotFoundException;
import com.project.travel_advisor.mapper.AttractionMapper;
import com.project.travel_advisor.repository.AddressRepository;
import com.project.travel_advisor.repository.AttractionRepository;
import com.project.travel_advisor.repository.CityRepository;
import com.project.travel_advisor.repository.SubcategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AttractionServiceImpl implements AttractionService{

    private final AttractionRepository attractionRepository;

    private final CityRepository cityRepository;

    private final SubcategoryRepository subcategoryRepository;

    private final AddressRepository addressRepository;

    @Override
    public List<AttractionDto> findAllAttractions() {
        return attractionRepository.findAll().stream().map(AttractionMapper::mapToAttractionDto).toList();
    }

    @Override
    public AttractionDto findAttractionById(Long id) {
        return attractionRepository.findById(id).map(AttractionMapper::mapToAttractionDto).orElseThrow(() -> new ResourceNotFoundException("This Attraction with id " + id + " does not exist"));
    }

    @Override
    public List<AttractionDto> findAttractionsInCityWithName(String cityName) {

        City foundCity = cityRepository.findCityByNameIgnoreCase(cityName).orElseThrow(() -> new ResourceNotFoundException("This city with name " + cityName + " does not exist"));

        return foundCity.getAttractions().stream().map(AttractionMapper::mapToAttractionDto).toList();
    }

    @Override
    public List<AttractionDto> findAttractionsByNameContainingIgnoreCase(String name) {

        return attractionRepository.findByNameContainingIgnoreCase(name).stream().map(AttractionMapper::mapToAttractionDto).toList();
    }

    @Override
    public AttractionDto findAttractionByNameIgnoreCase(String name) {

        Attraction foundAttraction = attractionRepository.findByNameIgnoreCase(name).orElseThrow(() -> new ResourceNotFoundException("This Attraction with name " + name + " does not exist"));

        return AttractionMapper.mapToAttractionDto(foundAttraction);
    }

    @Override
    @Transactional
    public AttractionDto createAnAttraction(AttractionDto attractionDto) {

        City foundCity = cityRepository.findById(attractionDto.cityId()).orElseThrow(() -> new ResourceNotFoundException("This Attraction belongs to a City with id " + attractionDto.cityId() + " does not exist"));

        Subcategory foundSubcategory = subcategoryRepository.findById(attractionDto.subcategoryId()).orElseThrow(() -> new ResourceNotFoundException("This Attraction belongs to a Subcategory with id " + attractionDto.subcategoryId() + " does not exist"));

        attractionRepository.findByAttractionNameIgnoreCaseAndCityId(attractionDto.name(), attractionDto.cityId()).ifPresent((foundAttraction) -> {throw new BadRequestException("This Attraction with name " + attractionDto.name() + " already exist in this City id " + attractionDto.cityId());
        });

        attractionRepository.findByAttractionNameIgnoreCaseAndSubcategoryId(attractionDto.name(), attractionDto.subcategoryId()).ifPresent((foundAttraction) -> {throw new BadRequestException("This Attraction with name " + attractionDto.name() + " already exist in this Subcategory id " + attractionDto.subcategoryId());
        });

        addressRepository.findAddressByAddressIgnoreCase(attractionDto.addressObj().getAddress()).ifPresent((foundAddress) -> {throw new BadRequestException("This Address " + attractionDto.addressObj().getAddress() + " already exists");
        });

        Attraction attraction = AttractionMapper.mapToAttraction(attractionDto);

        attraction.setCity(foundCity);
        foundCity.getAttractions().add(attraction);

        attraction.setSubcategory(foundSubcategory);
        foundSubcategory.getAttractions().add(attraction);

        Attraction savedAttraction = attractionRepository.save(attraction);

        return AttractionMapper.mapToAttractionDto(savedAttraction);
    }

    @Override
    @Transactional
    public void deleteAttractionById(Long id) {
        Attraction foundAttraction = attractionRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("This Attraction with id " + id + " does not exist"));

        foundAttraction.getCity().getAttractions().remove(foundAttraction);
        foundAttraction.setCity(null);

        foundAttraction.getSubcategory().getAttractions().remove(foundAttraction);
        foundAttraction.setSubcategory(null);

        foundAttraction.setAddress(null);

        attractionRepository.delete(foundAttraction);
    }
}
