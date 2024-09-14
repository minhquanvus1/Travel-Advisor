package com.project.travel_advisor.utils;

import com.project.travel_advisor.entity.AttractionReview;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

public class RatingUtils {

    public static int calculateNumberOfReviews(List<AttractionReview> attractionReviews) {
        return attractionReviews.size();
    }

    public static BigDecimal calculateAverageRating(List<AttractionReview> attractionReviews) {

        if (attractionReviews.isEmpty()) {
            return BigDecimal.ZERO;
        }

        // Calculate total rating
        BigDecimal totalRating = attractionReviews.stream()
                .map(review -> {
                    BigDecimal rating = review.getRating();
                    return rating != null ? rating : BigDecimal.ZERO;  // Handle null values
                })
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        // Calculate number of reviews
        BigDecimal numberOfReviews = new BigDecimal(attractionReviews.size());

        // Calculate average rating
        BigDecimal averageRating = totalRating.divide(numberOfReviews, 2, RoundingMode.HALF_UP);

        // Round to the nearest 0.5
        BigDecimal roundedRating = averageRating.multiply(new BigDecimal("2"))
                .setScale(0, RoundingMode.HALF_UP)  // Round to the nearest whole number
                .divide(new BigDecimal("2"), 2, RoundingMode.HALF_UP)
                .setScale(1, RoundingMode.HALF_UP);  // Divide by 2 to get the nearest 0.5

        return roundedRating;  // Ensure one decimal place
    }

}
