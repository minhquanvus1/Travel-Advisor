package com.project.travel_advisor.repository;

import com.project.travel_advisor.entity.City;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CityRepository extends JpaRepository<City, Long> {
}
