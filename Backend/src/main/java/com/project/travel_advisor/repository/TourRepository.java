package com.project.travel_advisor.repository;

import com.project.travel_advisor.entity.Tour;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface TourRepository extends JpaRepository<Tour, Long> {

    @Query("SELECT t from Tour t WHERE UPPER(t.name) = UPPER(?1)")
    Optional<Tour> findTourByNameIgnoreCase(String name);

    @Query("SELECT t from Tour t WHERE UPPER(t.name) = UPPER(:tourName) AND UPPER(t.city.name) = UPPER(:cityName)")
    Optional<Tour> findTourByTourNameAndCityNameIgnoreCase(@Param("tourName") String tourName, @Param("cityName") String cityName);
}
