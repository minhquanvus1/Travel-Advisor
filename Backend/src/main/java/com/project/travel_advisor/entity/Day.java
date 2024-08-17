package com.project.travel_advisor.entity;

import jakarta.persistence.*;
import lombok.*;

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

    @ManyToOne
    @JoinColumn(name = "tour_id")
    private Tour tour;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "day")
    private List<Stop> stops;
}
