package com.project.travel_advisor.entity;

import jakarta.persistence.*;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
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
    @NotNull(message = "Day Number must be provided")
    @Min(value = 1, message = "Day Number must be >= 1")
    private int dayNumber;

    @ManyToOne
    @JoinColumn(name = "tour_id")
    private Tour tour;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "day")
    private List<@Valid Stop> stops = new ArrayList<>();

    public void addStops(List<Stop> stops) {
        this.stops.addAll(stops);
        stops.forEach(stop -> stop.setDay(this));
    }
}
