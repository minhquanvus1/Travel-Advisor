package com.project.travel_advisor.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "start_detail")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class StartDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String address;

    private String description;

    @OneToOne
    @JoinColumn(name = "departure_and_return_id")
    @JsonBackReference
    private DepartureAndReturn departureAndReturn;
}
