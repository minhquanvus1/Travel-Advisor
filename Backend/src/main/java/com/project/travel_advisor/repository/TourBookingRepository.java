package com.project.travel_advisor.repository;

import com.project.travel_advisor.entity.TourBooking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TourBookingRepository extends JpaRepository<TourBooking, Long> {

    List<TourBooking> findAllByUserId(Long userId);

    List<TourBooking> findAllByTourId(Long tourId);

    List<TourBooking> findAllByUserIdAndTourId(Long userId, Long tourId);
}
