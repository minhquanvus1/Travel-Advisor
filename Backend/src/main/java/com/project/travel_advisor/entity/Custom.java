package com.project.travel_advisor.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Entity
@Table(name = "custom")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Custom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Custom Name must be provided")
    private String name;

    @Column(length = 2000)
    @NotBlank(message = "Advice for Custom must be provided")
    private String advice;

    @ManyToOne
    @JoinColumn(name = "travel_advice_id")
    @JsonBackReference
    private TravelAdvice travelAdvice;
}
