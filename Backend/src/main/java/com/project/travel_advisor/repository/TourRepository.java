package com.project.travel_advisor.repository;

import com.project.travel_advisor.entity.Tour;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface TourRepository extends JpaRepository<Tour, Long> {

    @Query("SELECT t from Tour t WHERE UPPER(t.name) = UPPER(?1)")
    Optional<Tour> findTourByNameIgnoreCase(String name);
}
