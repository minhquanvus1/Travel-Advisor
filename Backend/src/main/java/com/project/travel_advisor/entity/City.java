package com.project.travel_advisor.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "city")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class City {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(columnDefinition="TEXT")
    private String description;

    @Column(name = "image_url", columnDefinition = "TEXT")
    private String imageUrl;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "city", orphanRemoval = true)
    @JsonManagedReference
    private List<Restaurant> restaurants;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "city", orphanRemoval = true)
    @JsonManagedReference
    private List<Attraction> attractions;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "city", orphanRemoval = true)
    @JsonManagedReference
    private List<Tour> tours;

    @ManyToMany(mappedBy = "cities", cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
    private List<Cuisine> cuisines;

    @OneToOne(mappedBy = "city", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private TravelAdvice travelAdvice;

}
