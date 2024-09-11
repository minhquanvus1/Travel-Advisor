package com.project.travel_advisor.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "users")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "first_name")
    @NotBlank(message = "firstName must be provided")
    private String firstName;

    @Column(name = "last_name")
    @NotBlank(message = "lastName must be provided")
    private String lastName;

    @NotBlank(message = "city must be provided")
    private String city;

    @NotBlank(message = "country must be provided")
    private String country;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Column(unique = true, nullable = false)
    private String subject;

    @Column(name = "image_url")
    @NotBlank(message = "imageUrl must be provided")
    private String imageUrl;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "user", orphanRemoval = true)
    @JsonIgnore
    private List<AttractionReview> attractionReviews;

    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE, orphanRemoval = true)
    @JsonIgnore
    private List<TourBooking> tourBookings = new ArrayList<>();

    public void addTourBooking(TourBooking tourBooking) {

        this.tourBookings.add(tourBooking);
        tourBooking.setUser(this);
    }

    public void removeTourBooking(TourBooking tourBooking) {

        this.tourBookings.remove(tourBooking);
        tourBooking.setUser(null);
    }
}
