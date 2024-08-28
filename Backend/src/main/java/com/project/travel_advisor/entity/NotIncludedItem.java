package com.project.travel_advisor.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "not_included_item")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class NotIncludedItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 2000)
    private String item;

    @ManyToOne
    @JoinColumn(name = "tour_detail_id")
    private TourDetail tourDetail;
}
