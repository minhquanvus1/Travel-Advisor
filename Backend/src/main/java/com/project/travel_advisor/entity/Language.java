package com.project.travel_advisor.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "language")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class Language {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @ManyToMany
    @JoinTable(name = "tour_languages",
    joinColumns = {@JoinColumn(name = "language_id")},
    inverseJoinColumns = {@JoinColumn(name = "tour_id")})
    private List<Tour> tours = new ArrayList<>();
}
