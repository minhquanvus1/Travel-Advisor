package com.project.travel_advisor.repository;

import com.project.travel_advisor.entity.Attraction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AttractionRepository extends JpaRepository<Attraction, Long> {
}
