package com.project.travel_advisor.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "getting_around")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GettingAround {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String mode;

    private String advice;

    @ManyToOne
    @JoinColumn(name = "travel_advice_id")
    @JsonBackReference
    private TravelAdvice travelAdvice;
}
