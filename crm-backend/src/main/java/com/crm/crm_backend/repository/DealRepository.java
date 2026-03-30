package com.crm.crm_backend.repository;

import com.crm.crm_backend.entity.Contact;
import com.crm.crm_backend.entity.Deal;
import com.crm.crm_backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface DealRepository extends JpaRepository<Deal, Long> {

    List<Deal> findByOwner(User owner);

    List<Deal> findByStage(Deal.Stage stage);

    List<Deal> findByContact(Contact contact);

    List<Deal> findByOwnerAndStage(User owner, Deal.Stage stage);
}