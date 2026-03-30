package com.crm.crm_backend.dto;

import com.crm.crm_backend.entity.Contact;
import lombok.Builder;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Builder
public class ContactResponse {

    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String company;
    private String status;
    private String ownerName;
    private LocalDateTime createdAt;

    public static ContactResponse fromEntity(Contact contact) {
        return ContactResponse.builder()
                .id(contact.getId())
                .firstName(contact.getFirstName())
                .lastName(contact.getLastName())
                .email(contact.getEmail())
                .phone(contact.getPhone())
                .company(contact.getCompany())
                .status(contact.getStatus() != null ?
                        contact.getStatus().name() : null)
                .ownerName(contact.getOwner() != null ?
                        contact.getOwner().getName() : null)
                .createdAt(contact.getCreatedAt())
                .build();
    }
}