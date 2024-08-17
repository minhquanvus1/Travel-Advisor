package com.project.travel_advisor.exception;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ErrorDetails {

    private Boolean success;

    private Integer error;

    private String message;
}
