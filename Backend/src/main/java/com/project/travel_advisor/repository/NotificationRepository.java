package com.project.travel_advisor.repository;

import com.project.travel_advisor.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {

    List<Notification> findAllByOrderBySentAtDesc();

    List<Notification> findAllByIsReadFalse();
}
