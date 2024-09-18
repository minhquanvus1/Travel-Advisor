package com.project.travel_advisor.controller;

import com.project.travel_advisor.dto.GetTourBookingResponseDto;
import com.project.travel_advisor.dto.TourBookingRequestDto;
import com.project.travel_advisor.dto.TourBookingResponseDto;
import com.project.travel_advisor.service.tourBooking.TourBookingService;
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
public class TourBookingController {

    private final TourBookingService tourBookingService;

    @GetMapping("/secure/tour-bookings")
    @PreAuthorize("hasAuthority('get:tour-bookings')")
    public ResponseEntity<List<GetTourBookingResponseDto>> findAllTourBookings() {

        return ResponseEntity.ok(tourBookingService.findAllTourBookings());
    }

    @GetMapping("/secure/tour-bookings/search/findByUserId")
    @PreAuthorize("hasAuthority('get:tour-bookings-by-user-id')")
    public ResponseEntity<List<GetTourBookingResponseDto>> findAllTourBookingsByUserId(@RequestParam Long userId) {

        return ResponseEntity.ok(tourBookingService.findAllTourBookingsByUserId(userId));
    }
    @PostMapping("/secure/book-tour")
    @PreAuthorize("hasAuthority('book:tour')")
    public ResponseEntity<TourBookingResponseDto> bookATour(@Valid @RequestBody TourBookingRequestDto tourBookingRequestDto) {

        return ResponseEntity.status(HttpStatus.CREATED).body(tourBookingService.bookATour(tourBookingRequestDto));
    }

    @DeleteMapping("/secure/tour-bookings/{id}")
    @PreAuthorize("hasAuthority('delete:booked-tour')")
    public ResponseEntity<Map<String, Object>> deleteABookedTour(@PathVariable Long id) {

        tourBookingService.deleteATourBookingById(id);

        Map<String, Object> response = new HashMap<>();
        response.put("deletedId", id);

        return ResponseEntity.ok(response);
    }
}
