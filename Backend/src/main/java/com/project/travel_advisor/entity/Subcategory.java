package com.project.travel_advisor.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "subcategory")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class Subcategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @ManyToOne
    @JoinColumn(name = "category_id")
    @JsonBackReference
    private Category category;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "subcategory", orphanRemoval = true)
    private List<Attraction> attractions;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "subcategory", orphanRemoval = true)
    private List<Tour> tours;
}
