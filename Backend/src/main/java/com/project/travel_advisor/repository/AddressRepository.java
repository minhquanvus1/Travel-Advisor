package com.project.travel_advisor.repository;

import com.project.travel_advisor.entity.Address;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AddressRepository extends JpaRepository<Address, Long> {
}
