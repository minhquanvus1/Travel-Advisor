package com.project.travel_advisor.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "accessibility")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class Accessibility {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 2000)
    private String item;

    @ManyToOne
    @JoinColumn(name = "tour_detail_id")
    private TourDetail tourDetail;
}
