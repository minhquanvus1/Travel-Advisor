package com.project.travel_advisor.entity;

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

    private double latitude;

    private double longitude;

    @Column(columnDefinition = "TEXT")
    private String description;

    @ManyToOne
    @JoinColumn(name = "city_id")
    private City city;

    @ManyToOne
    @JoinColumn(name = "subcategory_id")
    private Subcategory subcategory;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "attraction", orphanRemoval = true)
    private List<AttractionReview> attractionReviews;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "address_id")
    private Address address;
}
