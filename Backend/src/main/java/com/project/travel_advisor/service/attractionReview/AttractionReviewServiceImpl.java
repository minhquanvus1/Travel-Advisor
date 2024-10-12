package com.project.travel_advisor.service.attractionReview;

import com.project.travel_advisor.dto.AttractionReviewRequestDto;
import com.project.travel_advisor.dto.AttractionReviewResponseDto;
import com.project.travel_advisor.entity.Attraction;
import com.project.travel_advisor.entity.AttractionReview;
import com.project.travel_advisor.entity.User;
import com.project.travel_advisor.exception.BadRequestException;
import com.project.travel_advisor.exception.ResourceNotFoundException;
import com.project.travel_advisor.mapper.AttractionReviewMapper;
import com.project.travel_advisor.repository.AttractionRepository;
import com.project.travel_advisor.repository.AttractionReviewRepository;
import com.project.travel_advisor.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Caching;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AttractionReviewServiceImpl implements AttractionReviewService {

    private final AttractionReviewRepository attractionReviewRepository;

    private final UserRepository userRepository;

    private final AttractionRepository attractionRepository;

    @Override
    public List<AttractionReviewResponseDto> findAllAttractionReviews() {
        return attractionReviewRepository.findAll().stream().map(AttractionReviewMapper::mapToAttractionReviewResponseDto).toList();
    }

    @Override
    public List<AttractionReviewResponseDto> findAllAttractionReviewsByAttractionId(Long attractionId) {

        List<AttractionReview> foundAttractionReviews = attractionReviewRepository.findAllByAttractionId(attractionId);

        return foundAttractionReviews.stream().map(AttractionReviewMapper::mapToAttractionReviewResponseDto).toList();
    }

    @Override
    @Caching(evict = {
            @CacheEvict(value = "attraction", allEntries = true),
            @CacheEvict(value = "allAttractions", allEntries = true),
            @CacheEvict(value = "attractionByName", allEntries = true),
            @CacheEvict(value = "attractionsByName", allEntries = true),
            @CacheEvict(value = "attractionsInCity", allEntries = true)
    })
    public AttractionReviewResponseDto postAnAttractionReview(AttractionReviewRequestDto attractionReviewRequestDto) {

        User foundUser = userRepository.findById(attractionReviewRequestDto.userId()).orElseThrow(() -> new ResourceNotFoundException("This User with id " + attractionReviewRequestDto.userId() + " does not exist"));

        Attraction foundAttraction = attractionRepository.findById(attractionReviewRequestDto.attractionId()).orElseThrow(() -> new ResourceNotFoundException("This Attraction with id " + attractionReviewRequestDto.attractionId() + " does not exist"));

        attractionReviewRepository.findByUserIdAndAttractionId(attractionReviewRequestDto.userId(), attractionReviewRequestDto.attractionId()).ifPresent((foundReview) -> {throw new BadRequestException("This User with id " + attractionReviewRequestDto.userId() + " has already written Review for this Attraction with id " + attractionReviewRequestDto.attractionId());});

        AttractionReview attractionReview = AttractionReviewMapper.mapToAttractionReview(attractionReviewRequestDto);

        attractionReview.setUser(foundUser);
        foundUser.getAttractionReviews().add(attractionReview);

        attractionReview.setAttraction(foundAttraction);
        foundAttraction.getAttractionReviews().add(attractionReview);

        AttractionReview savedAttractionReview = attractionReviewRepository.save(attractionReview);

        return AttractionReviewMapper.mapToAttractionReviewResponseDto(savedAttractionReview);
    }

    @Override
    @Caching(evict = {
            @CacheEvict(value = "attraction", allEntries = true),
            @CacheEvict(value = "allAttractions", allEntries = true),
            @CacheEvict(value = "attractionByName", allEntries = true),
            @CacheEvict(value = "attractionsByName", allEntries = true),
            @CacheEvict(value = "attractionsInCity", allEntries = true)
    })
    public AttractionReviewResponseDto updateAnAttractionReview(Long id, AttractionReviewRequestDto attractionReviewRequestDto) {

        User foundUser = userRepository.findById(attractionReviewRequestDto.userId()).orElseThrow(() -> new ResourceNotFoundException("This User with id " + attractionReviewRequestDto.userId() + " does not exist"));

        Attraction foundAttraction = attractionRepository.findById(attractionReviewRequestDto.attractionId()).orElseThrow(() -> new ResourceNotFoundException("This Attraction with id " + attractionReviewRequestDto.attractionId() + " does not exist"));

        AttractionReview foundAttractionReview = attractionReviewRepository.findByUserIdAndAttractionId(attractionReviewRequestDto.userId(), attractionReviewRequestDto.attractionId()).orElseThrow(() -> new ResourceNotFoundException("This User with id " + attractionReviewRequestDto.userId() + " has not written a Review for Attraction with id " + attractionReviewRequestDto.attractionId()));

        foundAttractionReview.setTitle(attractionReviewRequestDto.title());
        foundAttractionReview.setRating(attractionReviewRequestDto.rating());
        foundAttractionReview.setDescription(attractionReviewRequestDto.description());
        foundAttractionReview.setReviewDate(LocalDate.now());

        return AttractionReviewMapper.mapToAttractionReviewResponseDto(attractionReviewRepository.save(foundAttractionReview));
    }

    @Override
    @Transactional
    @Caching(evict = {
            @CacheEvict(value = "attraction", allEntries = true),
            @CacheEvict(value = "allAttractions", allEntries = true),
            @CacheEvict(value = "attractionByName", allEntries = true),
            @CacheEvict(value = "attractionsByName", allEntries = true),
            @CacheEvict(value = "attractionsInCity", allEntries = true)
    })
    public void deleteAnAttractionReviewOfAUser(Long userId, Long attractionReviewId) {

        AttractionReview foundAttractionReview = attractionReviewRepository.findById(attractionReviewId).orElseThrow(() -> new ResourceNotFoundException("This Attraction Review with id " + attractionReviewId + " does not exist"));

        User foundUser = foundAttractionReview.getUser();
        Attraction foundAttraction = foundAttractionReview.getAttraction();

        foundUser.getAttractionReviews().remove(foundAttractionReview);
        foundAttraction.getAttractionReviews().remove(foundAttractionReview);

        userRepository.save(foundUser);
        attractionRepository.save(foundAttraction);
    }
}
