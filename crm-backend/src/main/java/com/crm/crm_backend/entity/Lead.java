package com.crm.crm_backend.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "leads")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Lead {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String firstName;

    private String lastName;

    @Column(nullable = false)
    private String email;

    private String phone;

    private String company;

    @Enumerated(EnumType.STRING)
    private Stage stage;

    private String source;

    private BigDecimal estimatedValue;

    @Enumerated(EnumType.STRING)
    private Priority priority;

    @ManyToOne
    @JoinColumn(name = "assigned_to")
    private User assignedTo;

    @ManyToOne
    @JoinColumn(name = "workspace_id", nullable = false)
    private Workspace workspace;

    @CreationTimestamp
    private LocalDateTime createdAt;

    public enum Stage {
        NEW,
        CONTACTED,
        QUALIFIED,
        LOST
    }

    public enum Priority {
        LOW,
        MEDIUM,
        HIGH
    }
}