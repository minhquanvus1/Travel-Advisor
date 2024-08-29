package com.project.travel_advisor.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

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

    @Override
    public String toString() {
        return "Cuisine{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", imageUrl='" + imageUrl + '\'' +
//                ", restaurants=" + restaurants +
                ", cities=" + cities +
                '}';
    }

    @NotBlank(message = "Cuisine Name must be provided")
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "image_url")
    private String imageUrl;

    @ManyToMany
    @JoinTable(name = "restaurant_cuisines",
    joinColumns = {@JoinColumn(name = "cuisine_id")},
    inverseJoinColumns = {@JoinColumn(name = "restaurant_id")})
    @JsonIgnore
    private Set<Restaurant> restaurants = new HashSet<>();

    @ManyToMany
    @JoinTable(name = "city_cuisines",
            joinColumns = @JoinColumn(name = "cuisine_id"),
            inverseJoinColumns = @JoinColumn(name = "city_id"))
    @JsonIgnore
    private Set<City> cities = new HashSet<>();

    public void addRestaurant(Restaurant restaurant) {
        if (this.restaurants == null) {
            this.restaurants = new HashSet<>();
        }
        this.restaurants.add(restaurant);
    }

    public void addCity(City city) {
        if (this.cities == null) {
            this.cities = new HashSet<>();
        }
        this.cities.add(city);
    }
}
