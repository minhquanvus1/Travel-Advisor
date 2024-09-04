package com.project.travel_advisor.controller;

import com.project.travel_advisor.dto.UserDto;
import com.project.travel_advisor.entity.User;
import com.project.travel_advisor.service.user.UserService;
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
public class UserController {

    private final UserService userService;

    @GetMapping("/users")
    public ResponseEntity<List<UserDto>> findAllUsers() {

        return ResponseEntity.ok(userService.findAllUsers());
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<UserDto> findAllUsers(@PathVariable Long id) {

        return ResponseEntity.ok(userService.findUserById(id));
    }

    @PostMapping("/users")
    public ResponseEntity<UserDto> createAUser(@Valid @RequestBody User user) {

        return ResponseEntity.status(HttpStatus.CREATED).body(userService.createAUser(user));
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<UserDto> updateAnUser(@PathVariable Long id, @Valid @RequestBody User user) {

        return ResponseEntity.ok(userService.updateAnUser(id, user));
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<Map<String, Object>> deleteUserById(@PathVariable Long id) {

        userService.deleteUserById(id);

        Map<String, Object> response = new HashMap<>();
        response.put("deletedId", id);

        return ResponseEntity.ok(response);
    }
}
