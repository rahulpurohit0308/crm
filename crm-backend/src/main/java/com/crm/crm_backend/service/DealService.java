package com.crm.crm_backend.service;

import com.crm.crm_backend.entity.Contact;
import com.crm.crm_backend.entity.Deal;
import com.crm.crm_backend.entity.User;
import com.crm.crm_backend.repository.DealRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class DealService {

    private final DealRepository dealRepository;

    public List<Deal> getAllDeals() {
        return dealRepository.findAll();
    }

    public Deal getDealById(Long id) {
        return dealRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Deal not found with id: " + id));
    }

    public List<Deal> getDealsByOwner(User owner) {
        return dealRepository.findByOwner(owner);
    }

    public List<Deal> getDealsByStage(Deal.Stage stage) {
        return dealRepository.findByStage(stage);
    }

    public List<Deal> getDealsByContact(Contact contact) {
        return dealRepository.findByContact(contact);
    }

    public Deal createDeal(Deal deal) {
        return dealRepository.save(deal);
    }

    public Deal updateDeal(Long id, Deal updatedDeal) {
        Deal existing = dealRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Deal not found with id: " + id));

        existing.setTitle(updatedDeal.getTitle());
        existing.setValue(updatedDeal.getValue());
        existing.setCurrency(updatedDeal.getCurrency());
        existing.setStage(updatedDeal.getStage());
        existing.setContact(updatedDeal.getContact());

        return dealRepository.save(existing);
    }

    public Deal updateStage(Long id, Deal.Stage newStage) {
        Deal deal = dealRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Deal not found with id: " + id));
        deal.setStage(newStage);
        return dealRepository.save(deal);
    }

    public void deleteDeal(Long id) {
        if (!dealRepository.existsById(id)) {
            throw new RuntimeException("Deal not found with id: " + id);
        }
        dealRepository.deleteById(id);
    }
}