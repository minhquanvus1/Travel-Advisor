package com.project.travel_advisor.repository;

import com.project.travel_advisor.entity.Language;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LanguageRepository extends JpaRepository<Language, Long> {

    Optional<Language> findLanguageByNameIgnoreCase(String name);
}
