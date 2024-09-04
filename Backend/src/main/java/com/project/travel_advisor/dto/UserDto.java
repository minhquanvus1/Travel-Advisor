package com.project.travel_advisor.dto;


public record UserDto(

        Long id,

        String firstName,

        String lastName,

        String city,

        String country,

        String imageUrl
) {
}
