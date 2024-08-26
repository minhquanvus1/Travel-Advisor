package com.project.travel_advisor.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "day")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class Day {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "day_number", nullable = false)
    private int dayNumber;

    @ManyToOne
    @JoinColumn(name = "tour_id")
    @JsonBackReference
    private Tour tour;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "day")
    @JsonManagedReference
    private List<Stop> stops = new ArrayList<>();

    public void addStops(List<Stop> stops) {
        this.stops.addAll(stops);
        stops.forEach(stop -> stop.setDay(this));
    }
}
