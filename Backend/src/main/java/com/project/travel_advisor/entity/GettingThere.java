package com.project.travel_advisor.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Entity
@Table(name = "getting_there")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GettingThere {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Mode of Getting There must be provided")
    private String mode;

    @Column(length = 2000)
    @NotBlank(message = "Advice of Getting There's Mode must be provided")
    private String advice;

    @ManyToOne
    @JoinColumn(name = "travel_advice_id")
    @JsonBackReference
    private TravelAdvice travelAdvice;
}
