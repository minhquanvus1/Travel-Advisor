package com.project.travel_advisor.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "tour_booking")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class TourBooking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "tour_booking_tracking_number")
    private String tourBookingTrackingNumber;

    @Column(name = "number_of_people")
    private int numberOfPeople;

    @Column(name = "total_price")
    private BigDecimal totalPrice;

    @Column(name = "tour_start_date")
    private LocalDate tourStartDate;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "tour_id", nullable = false)
    private Tour tour;
}
