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

    Optional<Attraction> findByNameIgnoreCase(String name);

    String HAVERSINE_PART = "(6371 * acos(cos(radians(:latitude)) * cos(radians(a.latitude)) * " +
            "cos(radians(a.longitude) - radians(:longitude)) + sin(radians(:latitude)) * sin(radians(a.latitude))))";

    @Query("SELECT a FROM Attraction a WHERE " + HAVERSINE_PART + " <= :radius ORDER BY " + HAVERSINE_PART)
    List<Attraction> findAllWithinRadius(@Param("latitude") double latitude,
                                         @Param("longitude") double longitude,
                                         @Param("radius") double radius);
}
