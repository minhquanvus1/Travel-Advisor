package com.project.travel_advisor.mapper;

import com.project.travel_advisor.dto.LanguageDto;
import com.project.travel_advisor.entity.Language;

public class LanguageMapper {

    public static LanguageDto mapToLanguageDto(Language language) {
        return new LanguageDto(language.getId(), language.getName());
    }
}
