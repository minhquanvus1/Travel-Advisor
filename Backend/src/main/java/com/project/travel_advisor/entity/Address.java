package com.project.travel_advisor.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "address")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String address;

    private String ward;

    private String district;

    private String city;

    private String country;

    @Column(name = "postal_code")
    private String postalCode;
}
