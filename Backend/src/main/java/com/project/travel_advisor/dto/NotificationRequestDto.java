package com.project.travel_advisor.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record NotificationRequestDto(

        @NotBlank(message = "Notification Title must be provided")
        String title,

        @NotBlank(message = "Notification Message must be provided")
        String message,

        @NotNull(message = "Sender Id must be provided")
        Long senderId
) {
}
