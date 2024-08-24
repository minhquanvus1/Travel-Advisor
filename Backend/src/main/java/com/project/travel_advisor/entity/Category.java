package com.project.travel_advisor.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;
import java.util.Set;

@Entity
@Table(name ="category")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "category", orphanRemoval = true)
    @JsonManagedReference
    private Set<Subcategory> subcategories;

    public void addSubcategories(Set<Subcategory> subcategories) {
        this.subcategories.addAll(subcategories);
        subcategories.forEach(subcategory -> subcategory.setCategory(this));
    }

    public void replaceSubcategories(Set<Subcategory> subcategories) {
        this.subcategories.forEach(subcategory -> subcategory.setCategory(null));
        this.subcategories.clear();
        addSubcategories(subcategories);
    }
}
