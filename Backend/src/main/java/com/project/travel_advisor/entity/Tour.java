package com.project.travel_advisor.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "tour")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class Tour {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(name = "max_group_size")
    private int maxGroupSize;

    private double duration;

    @Column(name = "min_age")
    private int minAge;

    @Column(name = "max_age")
    private int maxAge;

    private BigDecimal price;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "number_of_reviews")
    private int numberOfReviews;

    @Column(precision = 2, scale = 1)
    private BigDecimal rating;

    @ManyToOne
    @JoinColumn(name = "city_id")
    private City city;

    @ManyToOne
    @JoinColumn(name = "subcategory_id")
    private Subcategory subcategory;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "tour", orphanRemoval = true)
    private List<Day> days = new ArrayList<>();

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "tour", orphanRemoval = true)
    private List<Stop> stops = new ArrayList<>();

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "tour", orphanRemoval = true)
    private List<Highlight> highlights = new ArrayList<>();

    @ManyToMany(mappedBy = "tours", cascade = CascadeType.ALL)
    private List<Language> languages = new ArrayList<>();

    @OneToOne(mappedBy = "tour", cascade = CascadeType.ALL, orphanRemoval = true)
    private TourDetail tourDetail;

    @OneToMany(mappedBy = "tour", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<TourImage> tourImages = new ArrayList<>();
}
