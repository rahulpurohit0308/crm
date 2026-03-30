package com.crm.crm_backend.controller;

import com.crm.crm_backend.dto.DealRequest;
import com.crm.crm_backend.dto.DealResponse;
import com.crm.crm_backend.entity.Contact;
import com.crm.crm_backend.entity.Deal;
import com.crm.crm_backend.repository.ContactRepository;
import com.crm.crm_backend.service.DealService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/deals")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class DealController {

    private final DealService dealService;
    private final ContactRepository contactRepository;

    @GetMapping
    public ResponseEntity<List<DealResponse>> getAllDeals() {
        List<DealResponse> deals = dealService.getAllDeals()
                .stream()
                .map(DealResponse::fromEntity)
                .toList();
        return ResponseEntity.ok(deals);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DealResponse> getDealById(@PathVariable Long id) {
        return ResponseEntity.ok(
                DealResponse.fromEntity(dealService.getDealById(id))
        );
    }

    @GetMapping("/stage/{stage}")
    public ResponseEntity<List<DealResponse>> getDealsByStage(
            @PathVariable Deal.Stage stage) {
        List<DealResponse> deals = dealService.getDealsByStage(stage)
                .stream()
                .map(DealResponse::fromEntity)
                .toList();
        return ResponseEntity.ok(deals);
    }

    @PostMapping
    public ResponseEntity<DealResponse> createDeal(
            @Valid @RequestBody DealRequest request) {
        Deal deal = new Deal();
        deal.setTitle(request.getTitle());
        deal.setValue(request.getValue());
        deal.setCurrency(request.getCurrency());
        deal.setStage(request.getStage());

        if (request.getContactId() != null) {
            Contact contact = contactRepository.findById(request.getContactId())
                    .orElseThrow(() -> new RuntimeException("Contact not found"));
            deal.setContact(contact);
        }

        Deal saved = dealService.createDeal(deal);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(DealResponse.fromEntity(saved));
    }

    @PutMapping("/{id}")
    public ResponseEntity<DealResponse> updateDeal(
            @PathVariable Long id,
            @Valid @RequestBody DealRequest request) {
        Deal deal = new Deal();
        deal.setTitle(request.getTitle());
        deal.setValue(request.getValue());
        deal.setCurrency(request.getCurrency());
        deal.setStage(request.getStage());

        if (request.getContactId() != null) {
            Contact contact = contactRepository.findById(request.getContactId())
                    .orElseThrow(() -> new RuntimeException("Contact not found"));
            deal.setContact(contact);
        }

        Deal updated = dealService.updateDeal(id, deal);
        return ResponseEntity.ok(DealResponse.fromEntity(updated));
    }

    @PatchMapping("/{id}/stage")
    public ResponseEntity<DealResponse> updateStage(
            @PathVariable Long id,
            @RequestParam Deal.Stage stage) {
        Deal updated = dealService.updateStage(id, stage);
        return ResponseEntity.ok(DealResponse.fromEntity(updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDeal(@PathVariable Long id) {
        dealService.deleteDeal(id);
        return ResponseEntity.noContent().build();
    }
}