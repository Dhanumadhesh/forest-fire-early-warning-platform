package com.forestfire.forest_fire_platform.entity;

import jakarta.persistence.*;

@Entity
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double amount;
    private String paymentDate;
    private String paymentMethod;
    private String status;

    @ManyToOne
    @JoinColumn(name = "vendor_bill_id")
    private VendorBill vendorBill;

    public Payment() {
    }

    public Payment(Double amount, String paymentDate,
                   String paymentMethod, String status,
                   VendorBill vendorBill) {
        this.amount = amount;
        this.paymentDate = paymentDate;
        this.paymentMethod = paymentMethod;
        this.status = status;
        this.vendorBill = vendorBill;
    }

    public Long getId() {
        return id;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public String getPaymentDate() {
        return paymentDate;
    }

    public void setPaymentDate(String paymentDate) {
        this.paymentDate = paymentDate;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public VendorBill getVendorBill() {
        return vendorBill;
    }

    public void setVendorBill(VendorBill vendorBill) {
        this.vendorBill = vendorBill;
    }
}