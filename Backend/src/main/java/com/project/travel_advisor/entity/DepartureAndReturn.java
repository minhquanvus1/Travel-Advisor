package com.project.travel_advisor.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "departure_and_return")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class DepartureAndReturn {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "tour_detail_id")
    @JsonBackReference
    private TourDetail tourDetail;

    @OneToOne(mappedBy = "departureAndReturn", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private StartDetail startDetail;

    @OneToOne(mappedBy = "departureAndReturn", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private PickupDetail pickupDetail;

    @OneToOne(mappedBy = "departureAndReturn", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private EndDetail endDetail;
}
