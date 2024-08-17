package com.project.travel_advisor.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
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

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "city")
    private List<Restaurant> restaurants;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "city")
    private List<Attraction> attractions;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "city")
    private List<Tour> tours;

    @ManyToMany(cascade = CascadeType.ALL, mappedBy = "cities")
    private List<Cuisine> cuisines;

}
