package com.project.travel_advisor.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
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
    @NotBlank(message = "Highlight Description must be provided")
    private String description;

    @ManyToOne
    @JoinColumn(name = "tour_id")
    private Tour tour;
}
