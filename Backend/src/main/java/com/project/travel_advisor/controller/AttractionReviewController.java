package com.project.travel_advisor.controller;

import com.project.travel_advisor.dto.AttractionReviewRequestDto;
import com.project.travel_advisor.dto.AttractionReviewResponseDto;
import com.project.travel_advisor.service.attractionReview.AttractionReviewService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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

    @GetMapping("/attractions/{id}/attraction-reviews")
    public ResponseEntity<List<AttractionReviewResponseDto>> findAllAttractionReviewsByAttractionId(@PathVariable("id") Long attractionId) {

        return ResponseEntity.ok(attractionReviewService.findAllAttractionReviewsByAttractionId(attractionId));
    }

    @PostMapping("/secure/attraction-reviews")
    @PreAuthorize("hasAuthority('post:attraction-review')")
    public ResponseEntity<AttractionReviewResponseDto> postAnAttractionReview(@Valid @RequestBody AttractionReviewRequestDto attractionReviewRequestDto) {

        return ResponseEntity.status(HttpStatus.CREATED).body(attractionReviewService.postAnAttractionReview(attractionReviewRequestDto));
    }

    @PutMapping("/secure/attraction-reviews/{id}")
    @PreAuthorize("hasAuthority('put:attraction-review')")
    public ResponseEntity<AttractionReviewResponseDto> updateAnAttractionReview(@PathVariable Long id, @Valid @RequestBody AttractionReviewRequestDto attractionReviewRequestDto) {

        return ResponseEntity.status(HttpStatus.CREATED).body(attractionReviewService.updateAnAttractionReview(id, attractionReviewRequestDto));
    }

    @DeleteMapping("/secure/attraction-reviews/{attractionReviewId}")
    @PreAuthorize("hasAuthority('delete:attraction-review')")
    public ResponseEntity<Map<String, Object>> deleteAnAttractionReviewOfAUser(@PathVariable Long attractionReviewId, @RequestParam Long userId) {

        attractionReviewService.deleteAnAttractionReviewOfAUser(userId, attractionReviewId);

        Map<String, Object> response = new HashMap<>();
        response.put("deletedId", attractionReviewId);

        return ResponseEntity.ok(response);
    }
}
