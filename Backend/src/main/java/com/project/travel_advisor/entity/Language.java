package com.project.travel_advisor.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

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
    @JsonIgnore
    private Set<Tour> tours = new HashSet<>();
}
