package com.project.travel_advisor.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "travel_advice")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TravelAdvice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT")
    @NotBlank(message = "Visa advice must be provided")
    private String visa;

    @Column(name = "best_time_to_visit", columnDefinition = "TEXT")
    @NotBlank(message = "Best Time to Visit advice must be provided")
    private String bestTimeToVisit;

    @Column(columnDefinition = "TEXT")
    @NotBlank(message = "Tipping advice must be provided")
    private String tipping;

    @OneToOne
    @JoinColumn(name = "city_id")
    @JsonBackReference
    private City city;

    @OneToMany(mappedBy = "travelAdvice", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<@Valid GettingThere> gettingTheres = new ArrayList<>();

    @OneToMany(mappedBy = "travelAdvice", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<@Valid GettingAround> gettingArounds = new ArrayList<>();

    @OneToMany(mappedBy = "travelAdvice", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<@Valid OnTheGround> onTheGrounds = new ArrayList<>();

    @OneToMany(mappedBy = "travelAdvice", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<@Valid Custom> customs = new ArrayList<>();

}
