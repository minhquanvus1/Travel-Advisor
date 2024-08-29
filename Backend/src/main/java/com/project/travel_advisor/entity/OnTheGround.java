package com.project.travel_advisor.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Entity
@Table(name = "on_the_ground")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OnTheGround {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 2000)
    @NotBlank(message = "Question of On the Ground must be provided")
    private String question;

    @Column(length = 2000)
    @NotBlank(message = "Answer of On the Ground must be provided")
    private String answer;

    @ManyToOne
    @JoinColumn(name = "travel_advice_id")
    @JsonBackReference
    private TravelAdvice travelAdvice;
}
