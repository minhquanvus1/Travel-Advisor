package com.project.travel_advisor.dto;

public record PaymentInfo(

        int amount,

        String currency,

        String receiptEmail
) {
}
