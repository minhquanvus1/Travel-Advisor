package com.project.travel_advisor.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.util.List;

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
    @Column(unique = true)
    private String subject;

    @Column(name = "image_url")
    @NotBlank(message = "imageUrl must be provided")
    private String imageUrl;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "user", orphanRemoval = true)
    @JsonIgnore
    private List<AttractionReview> attractionReviews;
}
