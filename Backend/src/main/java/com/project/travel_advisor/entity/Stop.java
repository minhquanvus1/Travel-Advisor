package com.project.travel_advisor.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;


@Entity
@Table(name = "stop")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class Stop {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Stop Name must be provided")
    private String name;

    @NotNull(message = "Latitude must be provided")
    private double latitude;

    @NotNull(message = "Longitude must be provided")
    private double longitude;

    @Column(columnDefinition = "TEXT")
    @NotBlank(message = "Stop Description must be provided")
    private String description;

    @ManyToOne
    @JoinColumn(name = "tour_id")
    @JsonIgnore
    private Tour tour;

    @ManyToOne
    @JoinColumn(name = "day_id")
    @JsonIgnore
    private Day day;
}
