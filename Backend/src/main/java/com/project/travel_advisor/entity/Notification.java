package com.project.travel_advisor.entity;


import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "notification")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class Notification {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(columnDefinition = "TEXT")
    private String message;

    private LocalDateTime sentAt;

    private Boolean isRead;

    @ManyToOne
    @JoinColumn(name = "sender_id")
    private User sender;
}
