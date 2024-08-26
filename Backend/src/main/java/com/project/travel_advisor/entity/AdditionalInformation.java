package com.project.travel_advisor.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "additional_information")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class AdditionalInformation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 2000)
    private String item;

    @ManyToOne
    @JoinColumn(name = "tour_detail_id")
    @JsonBackReference
    private TourDetail tourDetail;
}
