package com.project.travel_advisor.entity;

import jakarta.persistence.*;
import lombok.*;

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
}
