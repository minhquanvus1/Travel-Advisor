package com.project.travel_advisor.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "restaurant")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class Restaurant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "website_url")
    private String websiteUrl;

    @Column(name = "phone_number")
    private String phoneNumber;

    private String description;

    @Column(name = "lowest_price")
    private BigDecimal lowestPrice;

    @Column(name = "highest_price")
    private BigDecimal highestPrice;

    @Column(name = "number_of_reviews")
    private int numberOfReviews;

    private BigDecimal rating;

    @ManyToOne
    @JoinColumn(name = "city_id")
    private City city;

    @ManyToMany(mappedBy = "restaurants")
    private List<Cuisine> cuisines;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "address_id")
    private Address address;
}
