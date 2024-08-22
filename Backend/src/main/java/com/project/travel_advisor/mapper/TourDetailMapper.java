package com.project.travel_advisor.mapper;

import com.project.travel_advisor.dto.TourDetailDto;
import com.project.travel_advisor.entity.TourDetail;

import java.util.ArrayList;
import java.util.List;

public class TourDetailMapper {

    public static TourDetailDto mapToTourDetailDto(TourDetail tourDetail) {

        List<String> included = new ArrayList<>();
        List<String> notIncluded = new ArrayList<>();
        List<String> additionalInformation = new ArrayList<>();
        List<String> accessibility = new ArrayList<>();

        tourDetail.getIncludedItems().forEach(item -> included.add(item.getItem()));
        tourDetail.getNotIncludedItems().forEach(item -> notIncluded.add(item.getItem()));
        tourDetail.getAdditionalInformations().forEach(item -> additionalInformation.add(item.getItem()));
        tourDetail.getAccessibilities().forEach(item -> accessibility.add(item.getItem()));

        return new TourDetailDto(included, notIncluded, tourDetail.getWhatToExpect(), additionalInformation, accessibility, tourDetail.getDepartureAndReturn());
    }
}
