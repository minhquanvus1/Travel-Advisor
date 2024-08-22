package com.project.travel_advisor.mapper;

import com.project.travel_advisor.dto.HighlightDto;
import com.project.travel_advisor.entity.Highlight;

public class HighlightMapper {

    public static HighlightDto mapToHighlightDto(Highlight highlight) {
        return new HighlightDto(highlight.getId(), highlight.getDescription());
    }
}
