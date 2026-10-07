package com.forestfire.forest_fire_platform.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "forest_budgets")
public class Budget {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String budgetYear;
    private Double allocatedAmount;
    private Double spentAmount;

    @ManyToOne
    @JoinColumn(name = "sector_id")
    private ForestSector sector;

    @ManyToOne
    @JoinColumn(name = "grant_id")
    private Grant grant;

    public Budget() {
    }

    public Budget(String budgetYear, Double allocatedAmount,
                  Double spentAmount, ForestSector sector,
                  Grant grant) {
        this.budgetYear = budgetYear;
        this.allocatedAmount = allocatedAmount;
        this.spentAmount = spentAmount;
        this.sector = sector;
        this.grant = grant;
    }

    public Long getId() {
        return id;
    }

    public String getBudgetYear() {
        return budgetYear;
    }

    public void setBudgetYear(String budgetYear) {
        this.budgetYear = budgetYear;
    }

    public Double getAllocatedAmount() {
        return allocatedAmount;
    }

    public void setAllocatedAmount(Double allocatedAmount) {
        this.allocatedAmount = allocatedAmount;
    }

    public Double getSpentAmount() {
        return spentAmount;
    }

    public void setSpentAmount(Double spentAmount) {
        this.spentAmount = spentAmount;
    }

    public ForestSector getSector() {
        return sector;
    }

    public void setSector(ForestSector sector) {
        this.sector = sector;
    }

    public Grant getGrant() {
        return grant;
    }

    public void setGrant(Grant grant) {
        this.grant = grant;
    }
}