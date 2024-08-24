package com.project.travel_advisor.mapper;

import com.project.travel_advisor.dto.TourImageDto;
import com.project.travel_advisor.dto.TourImageObjectDto;
import com.project.travel_advisor.entity.TourImage;

import java.util.ArrayList;
import java.util.List;

public class TourImageMapper {

    public static TourImageObjectDto mapToTourImageObjectDto(List<TourImage> tourImages) {
        List<TourImage> primaryImages = new ArrayList<>();
        List<TourImage> normalImages = new ArrayList<>();
        for(TourImage tourImage : tourImages) {
            if(tourImage.getIsPrimary()) {
                primaryImages.add(tourImage);
            } else {
                normalImages.add(tourImage);
            }
        }
        TourImageDto primaryImage = new TourImageDto(primaryImages.get(0).getImageUrl());
        List<TourImageDto> images = new ArrayList<>();
        for(TourImage normalImage : normalImages) {
            TourImageDto image = new TourImageDto(normalImage.getImageUrl());
            images.add(image);
        }
        return new TourImageObjectDto(primaryImage, images);
    }
}
