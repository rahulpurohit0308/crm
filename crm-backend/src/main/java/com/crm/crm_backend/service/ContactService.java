package com.crm.crm_backend.service;

import com.crm.crm_backend.entity.Contact;
import com.crm.crm_backend.entity.User;
import com.crm.crm_backend.repository.ContactRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class ContactService {

    private final ContactRepository contactRepository;

    public List<Contact> getAllContacts() {
        return contactRepository.findAll();
    }

    public Optional<Contact> getContactById(Long id) {
        return contactRepository.findById(id);
    }

    public List<Contact> getContactsByOwner(User owner) {
        return contactRepository.findByOwner(owner);
    }

    public List<Contact> getContactsByStatus(Contact.Status status) {
        return contactRepository.findByStatus(status);
    }

    public List<Contact> searchContacts(String keyword) {
        return contactRepository
                .findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCase(
                        keyword, keyword
                );
    }

    public Contact createContact(Contact contact) {
        if (contact.getEmail() != null &&
                contactRepository.findByEmail(contact.getEmail()).isPresent()) {
            throw new RuntimeException("Contact with this email already exists");
        }
        return contactRepository.save(contact);
    }

    public Contact updateContact(Long id, Contact updatedContact) {
        Contact existing = contactRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Contact not found with id: " + id));

        existing.setFirstName(updatedContact.getFirstName());
        existing.setLastName(updatedContact.getLastName());
        existing.setEmail(updatedContact.getEmail());
        existing.setPhone(updatedContact.getPhone());
        existing.setCompany(updatedContact.getCompany());
        existing.setStatus(updatedContact.getStatus());

        return contactRepository.save(existing);
    }

    public void deleteContact(Long id) {
        if (!contactRepository.existsById(id)) {
            throw new RuntimeException("Contact not found with id: " + id);
        }
        contactRepository.deleteById(id);
    }
}