package com.project.travel_advisor.repository;

import com.project.travel_advisor.entity.Address;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AddressRepository extends JpaRepository<Address, Long> {

    Optional<Address> findAddressByAddressIgnoreCase(String address);
}
