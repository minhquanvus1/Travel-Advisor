package com.project.travel_advisor.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "cuisine")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class Cuisine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String description;

    @Column(name = "image_url")
    private String imageUrl;

    @ManyToMany
    @JoinTable(name = "restaurant_cuisines",
    joinColumns = {@JoinColumn(name = "cuisine_id")},
    inverseJoinColumns = {@JoinColumn(name = "restaurant_id")})
    @JsonIgnore
    private List<Restaurant> restaurants;

    @ManyToMany
    @JoinTable(name = "city_cuisines",
            joinColumns = @JoinColumn(name = "cuisine_id"),
            inverseJoinColumns = @JoinColumn(name = "city_id"))
    @JsonIgnore
    private List<City> cities = new ArrayList<>();
}
