package com.forestfire.forest_fire_platform.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "forest_grants")
public class Grant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String grantName;
    private Double amount;
    private String grantDate;
    private String source;
    private String status;

    public Grant() {
    }

    public Grant(String grantName, Double amount,
                 String grantDate, String source,
                 String status) {
        this.grantName = grantName;
        this.amount = amount;
        this.grantDate = grantDate;
        this.source = source;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public String getGrantName() {
        return grantName;
    }

    public void setGrantName(String grantName) {
        this.grantName = grantName;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public String getGrantDate() {
        return grantDate;
    }

    public void setGrantDate(String grantDate) {
        this.grantDate = grantDate;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}