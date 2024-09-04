package com.project.travel_advisor.dto;

import java.util.List;

public record DayDto(

        Long id,

        int dayNumber,

        List<StopDto> stops
) {
}
