package com.project.travel_advisor.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "highlight")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class Highlight {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 2000)
    private String description;

    @ManyToOne
    @JoinColumn(name = "tour_id")
    private Tour tour;
}
