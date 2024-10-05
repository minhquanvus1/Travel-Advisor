package com.project.travel_advisor.service.attraction;

import com.project.travel_advisor.dto.AttractionRequestDto;
import com.project.travel_advisor.dto.AttractionResponseDto;
import com.project.travel_advisor.entity.Attraction;
import com.project.travel_advisor.entity.AttractionReview;
import com.project.travel_advisor.entity.City;
import com.project.travel_advisor.entity.Subcategory;
import com.project.travel_advisor.exception.BadRequestException;
import com.project.travel_advisor.exception.ResourceNotFoundException;
import com.project.travel_advisor.mapper.AttractionMapper;
import com.project.travel_advisor.repository.*;
import com.project.travel_advisor.utils.RatingUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AttractionServiceImpl implements AttractionService{

    private final AttractionRepository attractionRepository;

    private final AttractionReviewRepository attractionReviewRepository;

    private final CityRepository cityRepository;

    private final SubcategoryRepository subcategoryRepository;

    private final AddressRepository addressRepository;

    @Override
    @Cacheable(value = "allAttractions", key = "'allAttractions'", sync = true)
    public List<AttractionResponseDto> findAllAttractions() {
        System.out.println("Hit database all");
        List<AttractionResponseDto> result =  attractionRepository.findAll().stream().map(attraction -> new AttractionResponseDto(
                attraction.getId(),
                attraction.getName(),
                attraction.getSubcategory().getId(),
                attraction.getSubcategory().getName(),
                attraction.getCity().getId(),
                attraction.getCity().getName(),
                RatingUtils.calculateNumberOfReviews(attractionReviewRepository.findAllByAttractionId(attraction.getId())),
                attraction.getImageUrl(),
                attraction.getWebsiteUrl(),
                attraction.getAddress(),
                attraction.getLatitude(),
                attraction.getLongitude(),
                RatingUtils.calculateAverageRating(attractionReviewRepository.findAllByAttractionId(attraction.getId())),
                attraction.getDescription()
        )).toList();
        System.out.println("result is " + result);
        return result;
    }

    @Override
    @Cacheable(value = "attraction", key = "'attraction_' + #id", sync = true)
    public AttractionResponseDto findAttractionById(Long id) {
        return attractionRepository.findById(id).map(attraction -> new AttractionResponseDto(
                attraction.getId(),
                attraction.getName(),
                attraction.getSubcategory().getId(),
                attraction.getSubcategory().getName(),
                attraction.getCity().getId(),
                attraction.getCity().getName(),
                RatingUtils.calculateNumberOfReviews(attractionReviewRepository.findAllByAttractionId(attraction.getId())),
                attraction.getImageUrl(),
                attraction.getWebsiteUrl(),
                attraction.getAddress(),
                attraction.getLatitude(),
                attraction.getLongitude(),
                RatingUtils.calculateAverageRating(attractionReviewRepository.findAllByAttractionId(attraction.getId())),
                attraction.getDescription()
        )).orElseThrow(() -> new ResourceNotFoundException("This Attraction with id " + id + " does not exist"));
    }

    @Override
    @Cacheable(value = "attractionsInCity", key = "'cityName_' + #cityName.toLowerCase()", sync = true)
    public List<AttractionResponseDto> findAttractionsInCityWithName(String cityName) {

        City foundCity = cityRepository.findCityByNameIgnoreCase(cityName).orElseThrow(() -> new ResourceNotFoundException("This city with name " + cityName + " does not exist"));

        return foundCity.getAttractions().stream().map(attraction -> new AttractionResponseDto(
                attraction.getId(),
                attraction.getName(),
                attraction.getSubcategory().getId(),
                attraction.getSubcategory().getName(),
                attraction.getCity().getId(),
                attraction.getCity().getName(),
                RatingUtils.calculateNumberOfReviews(attractionReviewRepository.findAllByAttractionId(attraction.getId())),
                attraction.getImageUrl(),
                attraction.getWebsiteUrl(),
                attraction.getAddress(),
                attraction.getLatitude(),
                attraction.getLongitude(),
                RatingUtils.calculateAverageRating(attractionReviewRepository.findAllByAttractionId(attraction.getId())),
                attraction.getDescription()
        )).toList();
    }

    @Override
    @Cacheable(value = "attractionsByName", key = "#name.toLowerCase()", sync = true)
    public List<AttractionResponseDto> findAttractionsByNameContainingIgnoreCase(String name) {

        return attractionRepository.findByNameContainingIgnoreCase(name).stream().map(attraction -> new AttractionResponseDto(
                attraction.getId(),
                attraction.getName(),
                attraction.getSubcategory().getId(),
                attraction.getSubcategory().getName(),
                attraction.getCity().getId(),
                attraction.getCity().getName(),
                RatingUtils.calculateNumberOfReviews(attractionReviewRepository.findAllByAttractionId(attraction.getId())),
                attraction.getImageUrl(),
                attraction.getWebsiteUrl(),
                attraction.getAddress(),
                attraction.getLatitude(),
                attraction.getLongitude(),
                RatingUtils.calculateAverageRating(attractionReviewRepository.findAllByAttractionId(attraction.getId())),
                attraction.getDescription()
        )).toList();
    }

    @Override
    @Cacheable(value = "attractionByName", key = "#name.toLowerCase()", sync = true)
    public AttractionResponseDto findAttractionByNameIgnoreCase(String name) {

        Attraction foundAttraction = attractionRepository.findByNameIgnoreCase(name).orElseThrow(() -> new ResourceNotFoundException("This Attraction with name " + name + " does not exist"));

        List<AttractionReview> attractionReviews = attractionReviewRepository.findAllByAttractionId(foundAttraction.getId());

        return new AttractionResponseDto(
                foundAttraction.getId(),
                foundAttraction.getName(),
                foundAttraction.getSubcategory().getId(),
                foundAttraction.getSubcategory().getName(),
                foundAttraction.getCity().getId(),
                foundAttraction.getCity().getName(),
                RatingUtils.calculateNumberOfReviews(attractionReviews),
                foundAttraction.getImageUrl(),
                foundAttraction.getWebsiteUrl(),
                foundAttraction.getAddress(),
                foundAttraction.getLatitude(),
                foundAttraction.getLongitude(),
                RatingUtils.calculateAverageRating(attractionReviews),
                foundAttraction.getDescription()
        );
    }

    @Override
    @Transactional
    @Caching(evict = {
            @CacheEvict(value = "attraction", allEntries = true),
            @CacheEvict(value = "allAttractions", allEntries = true),
            @CacheEvict(value = "attractionByName", allEntries = true),
            @CacheEvict(value = "attractionsByName", allEntries = true),
            @CacheEvict(value = "attractionsInCity", allEntries = true)
    })
    public AttractionResponseDto createAnAttraction(AttractionRequestDto attractionRequestDto) {

        City foundCity = cityRepository.findById(attractionRequestDto.cityId()).orElseThrow(() -> new ResourceNotFoundException("This Attraction belongs to a City with id " + attractionRequestDto.cityId() + " does not exist"));

        Subcategory foundSubcategory = subcategoryRepository.findById(attractionRequestDto.subcategoryId()).orElseThrow(() -> new ResourceNotFoundException("This Attraction belongs to a Subcategory with id " + attractionRequestDto.subcategoryId() + " does not exist"));

        attractionRepository.findByAttractionNameIgnoreCaseAndCityId(attractionRequestDto.name(), attractionRequestDto.cityId()).ifPresent((foundAttraction) -> {throw new BadRequestException("This Attraction with name " + attractionRequestDto.name() + " already exist in this City id " + attractionRequestDto.cityId());
        });

        attractionRepository.findByAttractionNameIgnoreCaseAndSubcategoryId(attractionRequestDto.name(), attractionRequestDto.subcategoryId()).ifPresent((foundAttraction) -> {throw new BadRequestException("This Attraction with name " + attractionRequestDto.name() + " already exist in this Subcategory id " + attractionRequestDto.subcategoryId());
        });

        addressRepository.findAddressByAddressIgnoreCase(attractionRequestDto.addressObj().getAddress()).ifPresent((foundAddress) -> {throw new BadRequestException("This Address " + attractionRequestDto.addressObj().getAddress() + " already exists");
        });

        Attraction attraction = AttractionMapper.mapToAttraction(attractionRequestDto);

        attraction.setCity(foundCity);
        foundCity.getAttractions().add(attraction);

        attraction.setSubcategory(foundSubcategory);
        foundSubcategory.getAttractions().add(attraction);


        Attraction savedAttraction = attractionRepository.save(attraction);

        return new AttractionResponseDto(
                savedAttraction.getId(),
                savedAttraction.getName(),
                savedAttraction.getSubcategory().getId(),
                savedAttraction.getSubcategory().getName(),
                savedAttraction.getCity().getId(),
                savedAttraction.getCity().getName(),
                0,
                savedAttraction.getImageUrl(),
                savedAttraction.getWebsiteUrl(),
                savedAttraction.getAddress(),
                savedAttraction.getLatitude(),
                savedAttraction.getLongitude(),
                BigDecimal.ZERO,
                savedAttraction.getDescription()
        );
    }

    @Override
    @Transactional
    @Caching(evict = {
            @CacheEvict(value = "attraction", allEntries = true),
            @CacheEvict(value = "allAttractions", allEntries = true),
            @CacheEvict(value = "attractionByName", allEntries = true),
            @CacheEvict(value = "attractionsByName", allEntries = true),
            @CacheEvict(value = "attractionsInCity", allEntries = true)
    })
    public void deleteAttractionById(Long id) {
        Attraction foundAttraction = attractionRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("This Attraction with id " + id + " does not exist"));

        foundAttraction.getCity().getAttractions().remove(foundAttraction);
        foundAttraction.setCity(null);

        foundAttraction.getSubcategory().getAttractions().remove(foundAttraction);
        foundAttraction.setSubcategory(null);

        foundAttraction.setAddress(null);

        attractionRepository.delete(foundAttraction);
    }

    @Override
    public List<AttractionResponseDto> findNearbyAttractions(double latitude, double longitude, double radius) {

        return attractionRepository.findAllWithinRadius(latitude, longitude, radius).stream().map(attraction -> new AttractionResponseDto(
                attraction.getId(),
                attraction.getName(),
                attraction.getSubcategory().getId(),
                attraction.getSubcategory().getName(),
                attraction.getCity().getId(),
                attraction.getCity().getName(),
                RatingUtils.calculateNumberOfReviews(attractionReviewRepository.findAllByAttractionId(attraction.getId())),
                attraction.getImageUrl(),
                attraction.getWebsiteUrl(),
                attraction.getAddress(),
                attraction.getLatitude(),
                attraction.getLongitude(),
                RatingUtils.calculateAverageRating(attractionReviewRepository.findAllByAttractionId(attraction.getId())),
                attraction.getDescription()
        )).toList();
    }

    @Override
    @Cacheable(value = "testCache", key = "'testCacheKey'")
    public String testCache() {
        System.out.println("Executing testCaching method...");
        return "Cached response";
    }
}
