package com.crm.crm_backend.controller;

import com.crm.crm_backend.dto.ContactRequest;
import com.crm.crm_backend.dto.ContactResponse;
import com.crm.crm_backend.entity.Contact;
import com.crm.crm_backend.service.ContactService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/contacts")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class ContactController {

    private final ContactService contactService;

    @GetMapping
    public ResponseEntity<List<ContactResponse>> getAllContacts() {
        List<ContactResponse> contacts = contactService.getAllContacts()
                .stream()
                .map(ContactResponse::fromEntity)
                .toList();
        return ResponseEntity.ok(contacts);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ContactResponse> getContactById(@PathVariable Long id) {
        return contactService.getContactById(id)
                .map(ContactResponse::fromEntity)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/search")
    public ResponseEntity<List<ContactResponse>> searchContacts(
            @RequestParam String keyword) {
        List<ContactResponse> results = contactService.searchContacts(keyword)
                .stream()
                .map(ContactResponse::fromEntity)
                .toList();
        return ResponseEntity.ok(results);
    }

    @PostMapping
    public ResponseEntity<ContactResponse> createContact(
            @Valid @RequestBody ContactRequest request) {
        Contact contact = new Contact();
        contact.setFirstName(request.getFirstName());
        contact.setLastName(request.getLastName());
        contact.setEmail(request.getEmail());
        contact.setPhone(request.getPhone());
        contact.setCompany(request.getCompany());
        contact.setStatus(request.getStatus());

        Contact saved = contactService.createContact(contact);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ContactResponse.fromEntity(saved));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ContactResponse> updateContact(
            @PathVariable Long id,
            @Valid @RequestBody ContactRequest request) {
        Contact contact = new Contact();
        contact.setFirstName(request.getFirstName());
        contact.setLastName(request.getLastName());
        contact.setEmail(request.getEmail());
        contact.setPhone(request.getPhone());
        contact.setCompany(request.getCompany());
        contact.setStatus(request.getStatus());

        Contact updated = contactService.updateContact(id, contact);
        return ResponseEntity.ok(ContactResponse.fromEntity(updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteContact(@PathVariable Long id) {
        contactService.deleteContact(id);
        return ResponseEntity.noContent().build();
    }
}