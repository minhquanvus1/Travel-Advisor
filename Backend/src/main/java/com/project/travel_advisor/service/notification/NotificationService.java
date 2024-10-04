package com.project.travel_advisor.service.notification;

import com.project.travel_advisor.dto.NotificationRequestDto;
import com.project.travel_advisor.entity.Notification;

import java.util.List;

public interface NotificationService {

    void saveAndSendNotification(NotificationRequestDto notificationRequestDto);

    List<Notification> getAllNotificationsInDescendingOrderOfSentAt();

    void markNotificationAsRead(Long id);
}
