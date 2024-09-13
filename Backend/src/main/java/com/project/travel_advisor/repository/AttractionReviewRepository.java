package com.project.travel_advisor.repository;

import com.project.travel_advisor.entity.AttractionReview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface AttractionReviewRepository extends JpaRepository<AttractionReview, Long> {

    @Query("SELECT ar FROM AttractionReview ar WHERE ar.user.id = ?1 AND ar.attraction.id = ?2")
    Optional<AttractionReview> findByUserIdAndAttractionId(Long userId, Long attractionId);

    @Query("SELECT ar from AttractionReview ar WHERE ar.attraction.id = :attractionId")
    List<AttractionReview> findAllByAttractionId(@Param("attractionId") Long attractionId);
}
