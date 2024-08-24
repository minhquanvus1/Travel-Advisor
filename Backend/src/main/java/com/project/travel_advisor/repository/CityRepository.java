package com.project.travel_advisor.repository;

import com.project.travel_advisor.entity.City;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CityRepository extends JpaRepository<City, Long> {

    Optional<City> findCityByNameIgnoreCase(String name);
}
