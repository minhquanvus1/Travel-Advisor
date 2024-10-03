package com.project.travel_advisor.dto;

import java.io.Serializable;

public record CategoryResponseDto(
        Long id,

        String name
) implements Serializable {
}
