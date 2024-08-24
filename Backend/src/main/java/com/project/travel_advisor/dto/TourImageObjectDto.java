package com.project.travel_advisor.dto;

import java.util.List;

public record TourImageObjectDto(

        TourImageDto primaryImage,

        List<TourImageDto> images
) {
}
