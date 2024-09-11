package com.project.travel_advisor.dto;


import jakarta.validation.constraints.NotBlank;

public record UserDto(

        Long id,

        @NotBlank(message = "first name must be provided")
        String firstName,

        @NotBlank(message = "last name must be provided")
        String lastName,

        @NotBlank(message = "city must be provided")
        String city,

        @NotBlank(message = "country must be provided")
        String country,

        String imageUrl
) {
}
