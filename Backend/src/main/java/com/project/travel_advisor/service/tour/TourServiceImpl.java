package com.project.travel_advisor.service.tour;

import com.project.travel_advisor.dto.TourRequestDto;
import com.project.travel_advisor.dto.TourResponseDto;
import com.project.travel_advisor.entity.*;
import com.project.travel_advisor.exception.BadRequestException;
import com.project.travel_advisor.exception.ResourceNotFoundException;
import com.project.travel_advisor.mapper.TourMapper;
import com.project.travel_advisor.repository.CityRepository;
import com.project.travel_advisor.repository.LanguageRepository;
import com.project.travel_advisor.repository.SubcategoryRepository;
import com.project.travel_advisor.repository.TourRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TourServiceImpl implements TourService{

    private final TourRepository tourRepository;

    private final CityRepository cityRepository;

    private final SubcategoryRepository subcategoryRepository;

    private final LanguageRepository languageRepository;

    private final TourMapper tourMapper;

    @Override
    public List<TourResponseDto> findAllTour() {
        return tourRepository.findAll().stream().map(tourMapper::mapToTourResponseDto).toList();
    }

    @Override
    public TourResponseDto findById(Long id) {
        return tourRepository.findById(id).map(tourMapper::mapToTourResponseDto).orElseThrow(() -> new ResourceNotFoundException("This Tour with id " + id + " does not exist"));
    }

    @Override
    public List<TourResponseDto> findToursInCityWithName(String cityName) {

        City foundCity = cityRepository.findCityByNameIgnoreCase(cityName).orElseThrow(() -> new ResourceNotFoundException("This city with name " + cityName + " does not exist"));

        return foundCity.getTours().stream().map(tourMapper::mapToTourResponseDto).toList();
    }

    @Override
    public TourResponseDto findTourByTourNameAndCityName(String tourName, String cityName) {

        Tour tour = tourRepository.findTourByTourNameAndCityNameIgnoreCase(tourName, cityName).orElseThrow(() -> new ResourceNotFoundException("This Tour with name " + tourName + " does not exist in City with name " + cityName));

        return tourMapper.mapToTourResponseDto(tour);
    }

    @Override
    @Transactional
    public TourResponseDto createATour(TourRequestDto tourRequestDto) {
        tourRepository.findTourByNameIgnoreCase(tourRequestDto.name().trim()).ifPresent((tour) -> {throw new BadRequestException("This Tour with name " + tourRequestDto.name() + " already exists");});
        City foundCity = cityRepository.findById(tourRequestDto.cityId()).orElseThrow(() -> new BadRequestException("This Tour belonging to the cityId " + tourRequestDto.cityId() + " that does not exist"));
        Subcategory foundSubcategory = subcategoryRepository.findById(tourRequestDto.subcategoryId()).orElseThrow(() -> new BadRequestException("This Tour belonging to the subcategoryId " + tourRequestDto.subcategoryId() + " that does not exist"));

        Tour tour = tourMapper.mapToTour(tourRequestDto);
        tour.setCity(foundCity);
        foundCity.getTours().add(tour);

        tour.setSubcategory(foundSubcategory);
        foundSubcategory.getTours().add(tour);

        tour.getDays().forEach(day -> {day.setTour(tour); day.getStops().forEach(stop -> stop.setDay(day));});

        tour.getHighlights().forEach(highlight -> highlight.setTour(tour));

        List<Language> languages = tourRequestDto.languages().stream().toList();
        for (Language language : languages) {
            Optional<Language> foundLanguage = languageRepository.findLanguageByNameIgnoreCase(language.getName());

            if (foundLanguage.isPresent()) {
                // Existing language found - associate it with the tour
                Language existingLanguage = foundLanguage.get();
                existingLanguage.getTours().add(tour);
                tour.getLanguages().add(existingLanguage);  // Add existing language to the tour
            } else {
                // New language - add it to the tour and save it
                language.getTours().add(tour);
                tour.getLanguages().add(language);
                languageRepository.save(language);
            }
        }

        tour.getStops().forEach(stop -> stop.setTour(tour));

        tour.getTourImages().forEach(img -> img.setTour(tour));


        TourDetail tourDetail = tour.getTourDetail();
        tourDetail.setTour(tour);

        // Set the TourDetail's relationships
        tourDetail.getIncludedItems().forEach(item -> item.setTourDetail(tourDetail));
        tourDetail.getNotIncludedItems().forEach(item -> item.setTourDetail(tourDetail));
        tourDetail.getAdditionalInformations().forEach(info -> info.setTourDetail(tourDetail));
        tourDetail.getAccessibilities().forEach(accessibility -> accessibility.setTourDetail(tourDetail));

        DepartureAndReturn departureAndReturn = tourDetail.getDepartureAndReturn();
        departureAndReturn.setTourDetail(tourDetail);
        departureAndReturn.getStartDetail().setDepartureAndReturn(departureAndReturn);
        departureAndReturn.getPickupDetail().setDepartureAndReturn(departureAndReturn);
        departureAndReturn.getEndDetail().setDepartureAndReturn(departureAndReturn);

        Tour savedTour = tourRepository.save(tour);

        return tourMapper.mapToTourResponseDto(savedTour);
    }

    @Override
    @Transactional
    public void deleteATourById(Long id) {

        Tour tour = tourRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("Tour with id " + id + " not found"));

        // Remove the tour from the city's list of tours
        tour.getCity().getTours().remove(tour);
        tour.setCity(null);

        // Remove the tour from the subcategory's list of tours
        tour.getSubcategory().getTours().remove(tour);
        tour.setSubcategory(null);

        // Unlink the languages associated with the tour
        tour.getLanguages().forEach(language -> {language.getTours().remove(tour); if(language.getTours().isEmpty()) {languageRepository.delete(language);}});
        tour.getLanguages().clear();

        tour.getStops().forEach(stop -> {stop.setTour(null); stop.setDay(null);});

        // Clear the days and associated stops
        tour.getDays().forEach(day -> {day.setTour(null);day.getStops().clear();});
        tour.getDays().clear();

        // Clear the highlights associated with the tour
        tour.getHighlights().forEach(highlight -> highlight.setTour(null));
        tour.getHighlights().clear();

        // Clear the tour images associated with the tour
        tour.getTourImages().forEach(img -> img.setTour(null));
        tour.getTourImages().clear();

        // Handle the tour detail and its associated entities
        TourDetail tourDetail = tour.getTourDetail();

        tourDetail.getIncludedItems().forEach(item -> item.setTourDetail(null));
        tourDetail.getNotIncludedItems().forEach(item -> item.setTourDetail(null));
        tourDetail.getAdditionalInformations().forEach(info -> info.setTourDetail(null));
        tourDetail.getAccessibilities().forEach(accessibility -> accessibility.setTourDetail(null));

        tourDetail.getIncludedItems().clear();
        tourDetail.getNotIncludedItems().clear();
        tourDetail.getAdditionalInformations().clear();
        tourDetail.getAccessibilities().clear();

        DepartureAndReturn departureAndReturn = tourDetail.getDepartureAndReturn();

        departureAndReturn.getStartDetail().setDepartureAndReturn(null);
        departureAndReturn.getPickupDetail().setDepartureAndReturn(null);
        departureAndReturn.getEndDetail().setDepartureAndReturn(null);

        departureAndReturn.setStartDetail(null);
        departureAndReturn.setPickupDetail(null);
        departureAndReturn.setEndDetail(null);

        departureAndReturn.setTourDetail(null);
        tourDetail.setDepartureAndReturn(null);
        tourDetail.setTour(null);
        tour.setTourDetail(null);

        tour.getTourBookings().clear();

        // Finally, delete the tour
        tourRepository.delete(tour);
    }
}
