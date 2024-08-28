package com.project.travel_advisor.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "tour_detail")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class TourDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "what_to_expect", columnDefinition = "TEXT")
    private String whatToExpect;

    @OneToOne
    @JoinColumn(name = "tour_id")
    private Tour tour;

    @OneToMany(mappedBy = "tourDetail", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<IncludedItem> includedItems = new ArrayList<>();

    @OneToMany(mappedBy = "tourDetail", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<NotIncludedItem> notIncludedItems = new ArrayList<>();

    @OneToMany(mappedBy = "tourDetail", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<AdditionalInformation> additionalInformations = new ArrayList<>();

    @OneToMany(mappedBy = "tourDetail", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Accessibility> accessibilities = new ArrayList<>();

    @OneToOne(mappedBy = "tourDetail", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private DepartureAndReturn departureAndReturn;
}
