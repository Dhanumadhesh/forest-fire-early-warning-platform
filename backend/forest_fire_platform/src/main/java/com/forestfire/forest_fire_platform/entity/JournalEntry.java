package com.forestfire.forest_fire_platform.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "journal_entries")
public class JournalEntry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String entryDate;
    private String description;
    private String accountName;
    private String entryType;
    private Double amount;

    public JournalEntry() {
    }

    public JournalEntry(String entryDate, String description,
                        String accountName, String entryType,
                        Double amount) {
        this.entryDate = entryDate;
        this.description = description;
        this.accountName = accountName;
        this.entryType = entryType;
        this.amount = amount;
    }

    public Long getId() {
        return id;
    }

    public String getEntryDate() {
        return entryDate;
    }

    public void setEntryDate(String entryDate) {
        this.entryDate = entryDate;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getAccountName() {
        return accountName;
    }

    public void setAccountName(String accountName) {
        this.accountName = accountName;
    }

    public String getEntryType() {
        return entryType;
    }

    public void setEntryType(String entryType) {
        this.entryType = entryType;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }
}