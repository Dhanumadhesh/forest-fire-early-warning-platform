package com.forestfire.forest_fire_platform.controller;

import com.forestfire.forest_fire_platform.entity.Budget;
import com.forestfire.forest_fire_platform.service.BudgetService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/forest/budgets")
public class BudgetController {

    private final BudgetService service;

    public BudgetController(BudgetService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Budget> createBudget(
            @RequestBody Budget budget) {

        Budget savedBudget = service.createBudget(budget);

        return ResponseEntity.ok(savedBudget);
    }

    @GetMapping
    public ResponseEntity<List<Budget>> getAllBudgets() {

        List<Budget> budgets = service.getAllBudgets();

        return ResponseEntity.ok(budgets);
    }
}