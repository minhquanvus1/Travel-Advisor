package com.project.travel_advisor.service.stop;

import com.project.travel_advisor.dto.StopDto;
import com.project.travel_advisor.entity.Attraction;
import com.project.travel_advisor.entity.AttractionReview;
import com.project.travel_advisor.entity.Stop;
import com.project.travel_advisor.repository.AttractionRepository;
import com.project.travel_advisor.repository.AttractionReviewRepository;
import com.project.travel_advisor.service.attraction.AttractionService;
import com.project.travel_advisor.utils.RatingUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class StopServiceImpl implements StopService{

    private final AttractionRepository attractionRepository;

    private final AttractionReviewRepository attractionReviewRepository;
    @Override
    public List<StopDto> mapStopsToStopDtos(List<Stop> stops) {

        return stops.stream().map(this::getStopDto).toList();
    }

    private StopDto getStopDto(Stop stop) {
        Optional<Attraction> foundAttractionOptional = attractionRepository.findAttractionMatchingStopNameIgnoreCase(stop.getName().trim());

        StopDto stopDto;
        if(foundAttractionOptional.isPresent()) {
            Attraction foundAttraction = foundAttractionOptional.get();

            List<AttractionReview> attractionReviews = attractionReviewRepository.findAllByAttractionId(foundAttraction.getId());

            stopDto = new StopDto(
                    stop.getId(),
                    stop.getName(),
                    stop.getLatitude(),
                    stop.getLongitude(),
                    stop.getDescription(),
                    true,
                    foundAttraction.getImageUrl(),
                    foundAttraction.getName(),
                    RatingUtils.calculateNumberOfReviews(attractionReviews),
                    RatingUtils.calculateAverageRating(attractionReviews)
            );
        } else {
            stopDto = new StopDto(
                    stop.getId(),
                    stop.getName(),
                    stop.getLatitude(),
                    stop.getLongitude(),
                    stop.getDescription(),
                    false,
                    null,
                    null,
                    null,
                    null
            );
        }


        return stopDto;
    }
}
