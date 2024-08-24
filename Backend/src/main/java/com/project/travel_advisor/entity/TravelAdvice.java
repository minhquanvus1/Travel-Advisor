package com.project.travel_advisor.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
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

    private String visa;

    @Column(name = "best_time_to_visit", columnDefinition = "TEXT")
    private String bestTimeToVisit;

    private String tipping;

    @OneToOne
    @JoinColumn(name = "city_id")
    @JsonBackReference
    private City city;

    @OneToMany(mappedBy = "travelAdvice", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<GettingThere> gettingTheres = new ArrayList<>();

    @OneToMany(mappedBy = "travelAdvice", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<GettingAround> gettingArounds = new ArrayList<>();

    @OneToMany(mappedBy = "travelAdvice", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<OnTheGround> onTheGrounds = new ArrayList<>();

    @OneToMany(mappedBy = "travelAdvice", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Custom> customs = new ArrayList<>();

}
