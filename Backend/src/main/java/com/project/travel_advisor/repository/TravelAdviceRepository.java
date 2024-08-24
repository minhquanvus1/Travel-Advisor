package com.project.travel_advisor.repository;

import com.project.travel_advisor.entity.TravelAdvice;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TravelAdviceRepository extends JpaRepository<TravelAdvice, Long> {
}
