package com.project.travel_advisor.service.notification;

import com.project.travel_advisor.dto.NotificationRequestDto;
import com.project.travel_advisor.entity.Notification;
import com.project.travel_advisor.entity.User;
import com.project.travel_advisor.exception.ResourceNotFoundException;
import com.project.travel_advisor.repository.NotificationRepository;
import com.project.travel_advisor.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService{

    private final SimpMessagingTemplate messagingTemplate;

    private final NotificationRepository notificationRepository;

    private final UserRepository userRepository;
    @Override
    @Transactional
    public void saveAndSendNotification(NotificationRequestDto notificationRequestDto) {
        User foundUser = userRepository.findById(notificationRequestDto.senderId()).orElseThrow(() -> new ResourceNotFoundException("This Sender with id " + notificationRequestDto.senderId() + " does not exist"));
        Notification notification  = Notification
                .builder()
                .title(notificationRequestDto.title())
                .message(notificationRequestDto.message())
                .sender(foundUser)
                .sentAt(LocalDateTime.now())
                .isRead(false)
                .build();
        foundUser.getNotifications().add(notification);
        userRepository.save(foundUser);
        Notification savedNotification = notificationRepository.save(notification);
        messagingTemplate.convertAndSend("/topic/notifications", savedNotification);
    }

    @Override
    public List<Notification> getAllNotificationsInDescendingOrderOfSentAt() {
        return notificationRepository.findAllByOrderBySentAtDesc();
    }

    @Override
    public List<Notification> getAllUnreadNotifications() {

        return notificationRepository.findAllByIsReadFalse();
    }

    @Override
    public void markNotificationAsRead(Long id) {
        Notification foundNotification = notificationRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("This Notification with id " + id + " does not exist"));
        foundNotification.setIsRead(true);
        notificationRepository.save(foundNotification);
    }

    @Override
    @Transactional
    public void deleteANotification(Long id) {
        Notification foundNotification = notificationRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("This Notification with id " + id + " does not exist"));
        foundNotification.getSender().getNotifications().remove(foundNotification);
        foundNotification.setSender(null);
        notificationRepository.delete(foundNotification);
        messagingTemplate.convertAndSend("/topic/notifications", "Announcement is deleted with id " + id);
        System.out.println("WebSocket message sent for deleted notification with id: " + id);
    }
}
