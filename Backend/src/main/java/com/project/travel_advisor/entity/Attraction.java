package com.project.travel_advisor.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "attraction")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class Attraction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "website_url")
    private String websiteUrl;

    @Column(name = "number_of_reviews")
    private int numberOfReviews;

    private double latitude;

    private double longitude;

    private BigDecimal rating;

    private String description;

    @ManyToOne
    @JoinColumn(name = "city_id")
    @JsonBackReference
    private City city;

    @ManyToOne
    @JoinColumn(name = "subcategory_id")
    @JsonBackReference
    private Subcategory subcategory;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "attraction", orphanRemoval = true)
    @JsonManagedReference
    private List<AttractionReview> attractionReviews;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "address_id")
    private Address address;
}
