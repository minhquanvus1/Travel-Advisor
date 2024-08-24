package com.project.travel_advisor.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<?> handleBadRequestException(BadRequestException exception, WebRequest request) {
        ErrorDetails errorDetails = ErrorDetails.builder().success(false).error(HttpStatus.BAD_REQUEST.value()).message(exception.getMessage()).build();
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorDetails);
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<?> handleResourceNotFoundException(ResourceNotFoundException exception, WebRequest request) {
        ErrorDetails errorDetails = ErrorDetails.builder().success(false).error(HttpStatus.NOT_FOUND.value()).message(exception.getMessage()).build();
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorDetails);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> handleMethodArgumentNotValidException(MethodArgumentNotValidException exception, WebRequest request) {
        Map<String,String> errors = new HashMap<>();
        exception.getBindingResult().getAllErrors().forEach(e -> {
            String field = ((FieldError) e).getField();
            String message = e.getDefaultMessage();
            errors.put(field, message);
        });

        ErrorDetails errorDetails = ErrorDetails.builder().success(false).error(HttpStatus.BAD_REQUEST.value()).message(exception.getMessage()).errors(errors).build();
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorDetails);
    }

    //Global Exception
    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleGlobalException(Exception exception, WebRequest request) {
        ErrorDetails errorDetails = ErrorDetails.builder().success(false).error(500).message(exception.getMessage()).build();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorDetails);
    }
}
