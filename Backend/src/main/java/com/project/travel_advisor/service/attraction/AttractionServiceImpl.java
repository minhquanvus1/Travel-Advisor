package com.project.travel_advisor.service.attraction;

import com.project.travel_advisor.entity.Attraction;
import com.project.travel_advisor.exception.ResourceNotFoundException;
import com.project.travel_advisor.repository.AttractionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AttractionServiceImpl implements AttractionService{

    private final AttractionRepository attractionRepository;


    @Override
    public List<Attraction> findAllAttractions() {
        return attractionRepository.findAll();
    }

    @Override
    public Attraction findAttractionById(Long id) {
        return attractionRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("This Attraction with id " + id + " does not exist"));
    }
}
