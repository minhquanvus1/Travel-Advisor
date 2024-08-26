package com.project.travel_advisor.dto;

import jakarta.validation.constraints.NotBlank;

public record CategoryDto(
        Long id,

        @NotBlank(message = "category name is mandatory")
        String name
) {
}
