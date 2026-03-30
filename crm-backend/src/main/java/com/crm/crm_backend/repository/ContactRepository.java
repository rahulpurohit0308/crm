package com.crm.crm_backend.repository;

import com.crm.crm_backend.entity.Contact;
import com.crm.crm_backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface ContactRepository extends JpaRepository<Contact, Long> {

    List<Contact> findByOwner(User owner);

    List<Contact> findByStatus(Contact.Status status);

    Optional<Contact> findByEmail(String email);

    List<Contact> findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCase(
            String firstName, String lastName
    );
}