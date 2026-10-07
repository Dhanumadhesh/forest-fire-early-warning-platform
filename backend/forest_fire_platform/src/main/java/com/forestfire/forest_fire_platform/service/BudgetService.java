package com.forestfire.forest_fire_platform.service;

import com.forestfire.forest_fire_platform.entity.Budget;
import com.forestfire.forest_fire_platform.repository.BudgetRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BudgetService {

    private final BudgetRepository repository;

    public BudgetService(BudgetRepository repository) {
        this.repository = repository;
    }

    public Budget createBudget(Budget budget) {
        return repository.save(budget);
    }

    public List<Budget> getAllBudgets() {
        return repository.findAll();
    }
}