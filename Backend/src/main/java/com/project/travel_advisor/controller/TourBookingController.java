package com.project.travel_advisor.controller;

import com.project.travel_advisor.dto.GetTourBookingResponseDto;
import com.project.travel_advisor.dto.TourBookingRequestDto;
import com.project.travel_advisor.dto.TourBookingResponseDto;
import com.project.travel_advisor.service.tourBooking.TourBookingService;
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
public class TourBookingController {

    private final TourBookingService tourBookingService;

    @GetMapping("/tour-bookings")
    public ResponseEntity<List<GetTourBookingResponseDto>> findAllTourBookings() {

        return ResponseEntity.ok(tourBookingService.findAllTourBookings());
    }

    @GetMapping("/tour-bookings/search/findByUserId")
    public ResponseEntity<List<GetTourBookingResponseDto>> findAllTourBookingsByUserId(@RequestParam Long userId) {

        return ResponseEntity.ok(tourBookingService.findAllTourBookingsByUserId(userId));
    }
    @PostMapping("/book-tour")
    public ResponseEntity<TourBookingResponseDto> bookATour(@Valid @RequestBody TourBookingRequestDto tourBookingRequestDto) {

        return ResponseEntity.status(HttpStatus.CREATED).body(tourBookingService.bookATour(tourBookingRequestDto));
    }

    @DeleteMapping("/tour-bookings/{id}")
    public ResponseEntity<Map<String, Object>> deleteABookedTour(@PathVariable Long id) {

        tourBookingService.deleteATourBookingById(id);

        Map<String, Object> response = new HashMap<>();
        response.put("deletedId", id);

        return ResponseEntity.ok(response);
    }
}
