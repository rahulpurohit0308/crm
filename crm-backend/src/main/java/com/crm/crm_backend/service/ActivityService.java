package com.crm.crm_backend.service;

import com.crm.crm_backend.entity.Activity;
import com.crm.crm_backend.entity.Contact;
import com.crm.crm_backend.entity.Deal;
import com.crm.crm_backend.entity.User;
import com.crm.crm_backend.repository.ActivityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class ActivityService {

    private final ActivityRepository activityRepository;

    public List<Activity> getAllActivities() {
        return activityRepository.findAll();
    }

    public Activity getActivityById(Long id) {
        return activityRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Activity not found with id: " + id));
    }

    public List<Activity> getActivitiesByContact(Contact contact) {
        return activityRepository.findByContactOrderByCreatedAtDesc(contact);
    }

    public List<Activity> getActivitiesByDeal(Deal deal) {
        return activityRepository.findByDeal(deal);
    }

    public List<Activity> getActivitiesByUser(User user) {
        return activityRepository.findByUser(user);
    }

    public Activity createActivity(Activity activity) {
        return activityRepository.save(activity);
    }

    public Activity updateActivity(Long id, Activity updatedActivity) {
        Activity existing = activityRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Activity not found with id: " + id));

        existing.setType(updatedActivity.getType());
        existing.setNotes(updatedActivity.getNotes());
        existing.setActivityDate(updatedActivity.getActivityDate());

        return activityRepository.save(existing);
    }

    public void deleteActivity(Long id) {
        if (!activityRepository.existsById(id)) {
            throw new RuntimeException("Activity not found with id: " + id);
        }
        activityRepository.deleteById(id);
    }
}