package com.project.travel_advisor.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.math.BigDecimal;

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
    private Tour tour;

    @ManyToOne
    @JoinColumn(name = "day_id")
    private Day day;
}
