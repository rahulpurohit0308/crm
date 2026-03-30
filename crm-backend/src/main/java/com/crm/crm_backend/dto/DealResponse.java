package com.crm.crm_backend.dto;

import com.crm.crm_backend.entity.Deal;
import lombok.Builder;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Builder
public class DealResponse {

    private Long id;
    private String title;
    private Double value;
    private String currency;
    private String stage;
    private String contactName;
    private Long contactId;
    private String ownerName;
    private LocalDateTime createdAt;

    public static DealResponse fromEntity(Deal deal) {
        return DealResponse.builder()
                .id(deal.getId())
                .title(deal.getTitle())
                .value(deal.getValue())
                .currency(deal.getCurrency())
                .stage(deal.getStage().name())
                .contactName(deal.getContact() != null ?
                        deal.getContact().getFirstName() + " " +
                                deal.getContact().getLastName() : null)
                .contactId(deal.getContact() != null ?
                        deal.getContact().getId() : null)
                .ownerName(deal.getOwner() != null ?
                        deal.getOwner().getName() : null)
                .createdAt(deal.getCreatedAt())
                .build();
    }
}