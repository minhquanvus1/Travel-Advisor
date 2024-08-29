package com.project.travel_advisor.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Entity
@Table(name = "tour_image")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class TourImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "image_url")
    @NotBlank(message = "Tour ImageUrl must be provided")
    private String imageUrl;

    @Column(name = "is_primary")
    @NotNull(message = "isPrimary of an Image must be provided")
    private Boolean isPrimary;

    @ManyToOne
    @JoinColumn(name = "tour_id")
    private Tour tour;
}
