package com.project.travel_advisor.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "pickup_detail")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class PickupDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "hotel_pickup_offered")
    private Boolean hotelPickupOffered;

    @Column(name = "hotel_pickup_note")
    private String hotelPickupNote;

    @OneToOne
    @JoinColumn(name = "departure_and_return_id")
    @JsonBackReference
    private DepartureAndReturn departureAndReturn;
}
