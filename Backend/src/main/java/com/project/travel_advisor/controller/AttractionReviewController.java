package com.project.travel_advisor.controller;

import com.project.travel_advisor.dto.AttractionReviewRequestDto;
import com.project.travel_advisor.dto.AttractionReviewResponseDto;
import com.project.travel_advisor.service.attractionReview.AttractionReviewService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class AttractionReviewController {

    private final AttractionReviewService attractionReviewService;

    @GetMapping("/attraction-reviews")
    public ResponseEntity<List<AttractionReviewResponseDto>> findAllAttractionReviews() {

        return ResponseEntity.ok(attractionReviewService.findAllAttractionReviews());
    }

    @PostMapping("/attraction-reviews")
    public ResponseEntity<AttractionReviewResponseDto> postAnAttractionReview(@Valid @RequestBody AttractionReviewRequestDto attractionReviewRequestDto) {

        return ResponseEntity.status(HttpStatus.CREATED).body(attractionReviewService.postAnAttractionReview(attractionReviewRequestDto));
    }

    @PutMapping("/attraction-reviews/{id}")
    public ResponseEntity<AttractionReviewResponseDto> updateAnAttractionReview(@PathVariable Long id, @Valid @RequestBody AttractionReviewRequestDto attractionReviewRequestDto) {

        return ResponseEntity.status(HttpStatus.CREATED).body(attractionReviewService.updateAnAttractionReview(id, attractionReviewRequestDto));
    }

    @DeleteMapping("/attraction-reviews/{attractionReviewId}")
    public ResponseEntity<Map<String, Object>> deleteAnAttractionReviewOfAUser(@PathVariable Long attractionReviewId, @RequestParam Long userId) {

        attractionReviewService.deleteAnAttractionReviewOfAUser(userId, attractionReviewId);

        Map<String, Object> response = new HashMap<>();
        response.put("deletedId", attractionReviewId);

        return ResponseEntity.ok(response);
    }
}
