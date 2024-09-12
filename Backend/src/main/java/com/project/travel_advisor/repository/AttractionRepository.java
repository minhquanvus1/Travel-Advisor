package com.project.travel_advisor.repository;

import com.project.travel_advisor.entity.Attraction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface AttractionRepository extends JpaRepository<Attraction, Long> {

    @Query("SELECT a FROM Attraction a WHERE a.name = :attractionName AND a.city.id = :cityId")
    Optional<Attraction> findByAttractionNameIgnoreCaseAndCityId(@Param("attractionName") String name, @Param("cityId") Long id);

    @Query("SELECT a FROM Attraction a WHERE a.name = :attractionName AND a.subcategory.id = :subcategoryId")
    Optional<Attraction> findByAttractionNameIgnoreCaseAndSubcategoryId(@Param("attractionName") String name, @Param("subcategoryId") Long id);

    @Query("SELECT a from Attraction a INNER JOIN Stop s ON UPPER(a.name) = UPPER(:stopName)")
    Optional<Attraction> findAttractionMatchingStopNameIgnoreCase(@Param("stopName") String stopName);

    List<Attraction> findByNameContainingIgnoreCase(String name);
}
