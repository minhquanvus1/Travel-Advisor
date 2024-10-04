package com.project.travel_advisor.controller;

import com.project.travel_advisor.dto.NotificationRequestDto;
import com.project.travel_advisor.entity.Notification;
import com.project.travel_advisor.service.notification.NotificationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    @MessageMapping("send-noti")
    public void sendNotifications(@Payload @Valid NotificationRequestDto notificationRequestDto) {
        notificationService.saveAndSendNotification(notificationRequestDto);
    }

    @GetMapping("/notifications")
    public ResponseEntity<List<Notification>> getAllNotificationsInDescendingOrderOfSentAt() {

        return ResponseEntity.ok(notificationService.getAllNotificationsInDescendingOrderOfSentAt());
    }

    @PatchMapping("/notifications/{id}")
    public ResponseEntity<String> markNotificationAsRead(@PathVariable Long id) {
        notificationService.markNotificationAsRead(id);
        return ResponseEntity.ok("Notification is marked as read");
    }
}
