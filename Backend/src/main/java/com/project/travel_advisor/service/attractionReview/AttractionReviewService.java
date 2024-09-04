package com.project.travel_advisor.service.attractionReview;

import com.project.travel_advisor.dto.AttractionReviewRequestDto;
import com.project.travel_advisor.dto.AttractionReviewResponseDto;

import java.util.List;

public interface AttractionReviewService {

    List<AttractionReviewResponseDto> findAllAttractionReviews();

    AttractionReviewResponseDto postAnAttractionReview(AttractionReviewRequestDto attractionReviewRequestDto);

    AttractionReviewResponseDto updateAnAttractionReview(Long id, AttractionReviewRequestDto attractionReviewRequestDto);

    void deleteAnAttractionReviewOfAUser(Long userId, Long attractionReviewId);


}
