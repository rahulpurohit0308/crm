package com.crm.crm_backend.dto;

import com.crm.crm_backend.entity.Deal;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class DealRequest {

    @NotBlank(message = "Title is required")
    private String title;

    private Double value;
    private String currency;

    @NotNull(message = "Stage is required")
    private Deal.Stage stage;

    private Long contactId;
}