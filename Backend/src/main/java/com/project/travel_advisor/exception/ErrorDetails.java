package com.project.travel_advisor.exception;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import java.util.HashMap;
import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ErrorDetails {

    private Boolean success;

    private Integer error;

    private String message;

    private Map<String,String> errors = new HashMap<>();
}
