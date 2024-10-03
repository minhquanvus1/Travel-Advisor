package com.project.travel_advisor.dto;

import jakarta.validation.constraints.NotBlank;

import java.io.Serializable;

public record CuisineDto(
        Long id,

        @NotBlank(message = "Cuisine Name must be provided")
        String name
) implements Serializable {
}
