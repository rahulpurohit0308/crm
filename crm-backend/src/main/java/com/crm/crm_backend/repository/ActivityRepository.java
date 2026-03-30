package com.crm.crm_backend.repository;

import com.crm.crm_backend.entity.Activity;
import com.crm.crm_backend.entity.Contact;
import com.crm.crm_backend.entity.Deal;
import com.crm.crm_backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ActivityRepository extends JpaRepository<Activity, Long> {

    List<Activity> findByContact(Contact contact);

    List<Activity> findByDeal(Deal deal);

    List<Activity> findByUser(User user);

    List<Activity> findByType(Activity.Type type);

    List<Activity> findByContactOrderByCreatedAtDesc(Contact contact);
}