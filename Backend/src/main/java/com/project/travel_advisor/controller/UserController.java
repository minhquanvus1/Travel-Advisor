package com.project.travel_advisor.controller;

import com.project.travel_advisor.dto.UserDto;
import com.project.travel_advisor.service.user.UserService;
import com.project.travel_advisor.utils.ExtractJWT;
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
public class UserController {

    private final UserService userService;

    @GetMapping("/secure/users")
    @PreAuthorize("hasAuthority('get:users')")
    public ResponseEntity<List<UserDto>> findAllUsers(@RequestHeader(value = "Authorization") String token) {
        String sub = ExtractJWT.payloadJWTExtraction(token, "sub");
        String permissions = ExtractJWT.payloadJWTExtraction(token, "permissions");
        System.out.println("sub is " + sub);
        System.out.println("permissions are " + permissions);
        return ResponseEntity.ok(userService.findAllUsers());
    }

    @GetMapping("/secure/users/{id}")
    @PreAuthorize("hasAuthority('get:user')")
    public ResponseEntity<UserDto> findUserById(@PathVariable Long id) {

        return ResponseEntity.ok(userService.findUserById(id));
    }

    @PostMapping("/secure/users")
    @PreAuthorize("hasAuthority('post:user')")
    public ResponseEntity<UserDto> createAUser(@RequestHeader(value = "Authorization") String token, @Valid @RequestBody UserDto userDto) {

        String subject = ExtractJWT.payloadJWTExtraction(token, "sub");
        System.out.println("subject called is " + subject);
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.createAUser(userDto, subject));
    }

    @GetMapping("/secure/users/search/findBySubject")
    @PreAuthorize("hasAuthority('get:user-by-subject')")
    public ResponseEntity<UserDto> findUserBySubject(@RequestParam String subject) {

        return ResponseEntity.ok(userService.findUserBySubject(subject));
    }

    @PutMapping("/secure/users/{id}")
    @PreAuthorize("hasAuthority('put:user')")
    public ResponseEntity<UserDto> updateAnUser(@PathVariable Long id, @Valid @RequestBody UserDto userDto) {

        return ResponseEntity.ok(userService.updateAnUser(id, userDto));
    }

    @DeleteMapping("/secure/users/{id}")
    @PreAuthorize("hasAuthority('delete:user')")
    public ResponseEntity<Map<String, Object>> deleteUserById(@PathVariable Long id) {

        userService.deleteUserById(id);

        Map<String, Object> response = new HashMap<>();
        response.put("deletedId", id);

        return ResponseEntity.ok(response);
    }
}
