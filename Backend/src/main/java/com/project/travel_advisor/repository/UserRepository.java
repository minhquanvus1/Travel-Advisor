package com.project.travel_advisor.repository;

import com.project.travel_advisor.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findBySubject(String subject);
}
