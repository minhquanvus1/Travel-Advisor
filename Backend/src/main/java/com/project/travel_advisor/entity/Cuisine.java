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

    private String name;

    private String description;

    @Column(name = "image_url")
    private String imageUrl;

    @ManyToMany
    @JoinTable(name = "restaurant_cuisines",
    joinColumns = {@JoinColumn(name = "cuisine_id")},
    inverseJoinColumns = {@JoinColumn(name = "restaurant_id")})
    @JsonIgnore
    private List<Restaurant> restaurants = new ArrayList<>();

    @ManyToMany
    @JoinTable(name = "city_cuisines",
            joinColumns = @JoinColumn(name = "cuisine_id"),
            inverseJoinColumns = @JoinColumn(name = "city_id"))
    @JsonIgnore
    private List<City> cities = new ArrayList<>();

    public void addRestaurant(Restaurant restaurant) {
        if (this.restaurants == null) {
            this.restaurants = new ArrayList<>();
        }
        this.restaurants.add(restaurant);
    }
}
