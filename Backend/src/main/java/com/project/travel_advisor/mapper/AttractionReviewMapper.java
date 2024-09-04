package com.project.travel_advisor.mapper;

import com.project.travel_advisor.dto.AttractionReviewRequestDto;
import com.project.travel_advisor.dto.AttractionReviewResponseDto;
import com.project.travel_advisor.entity.AttractionReview;

import java.time.LocalDate;

public class AttractionReviewMapper {

    public static AttractionReview mapToAttractionReview(AttractionReviewRequestDto attractionReviewRequestDto) {

        return AttractionReview
                .builder()
                .id(null)
                .title(attractionReviewRequestDto.title())
                .attraction(null)
                .user(null)
                .description(attractionReviewRequestDto.description())
                .reviewDate(LocalDate.now())
                .build();
    }

    public static AttractionReviewResponseDto mapToAttractionReviewResponseDto(AttractionReview attractionReview) {

        return new AttractionReviewResponseDto(
                attractionReview.getId(),
                attractionReview.getTitle(),
                attractionReview.getDescription(),
                attractionReview.getRating(),
                attractionReview.getReviewDate(),
                UserMapper.mapToUserResponseDto(attractionReview.getUser()),
                attractionReview.getAttraction().getName()
        );
    }
}
