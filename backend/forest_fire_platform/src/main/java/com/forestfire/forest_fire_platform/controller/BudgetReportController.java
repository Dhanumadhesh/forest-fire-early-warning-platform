package com.forestfire.forest_fire_platform.controller;

import com.forestfire.forest_fire_platform.entity.Budget;
import com.forestfire.forest_fire_platform.repository.BudgetRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/forest/reports")
public class BudgetReportController {

    private final BudgetRepository budgetRepository;

    public BudgetReportController(BudgetRepository budgetRepository) {
        this.budgetRepository = budgetRepository;
    }

    @GetMapping("/budget")
    public List<Budget> getBudgetReport() {
        return budgetRepository.findAll();
    }
}