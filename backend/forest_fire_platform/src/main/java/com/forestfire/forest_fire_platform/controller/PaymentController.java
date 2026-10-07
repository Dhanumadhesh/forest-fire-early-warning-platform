package com.forestfire.forest_fire_platform.controller;

import com.forestfire.forest_fire_platform.entity.Payment;
import com.forestfire.forest_fire_platform.service.PaymentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/forest/payments")
public class PaymentController {

    private final PaymentService service;

    public PaymentController(PaymentService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Payment> createPayment(
            @RequestBody Payment payment) {

        Payment savedPayment = service.createPayment(payment);

        return ResponseEntity.ok(savedPayment);
    }

    @GetMapping
    public ResponseEntity<List<Payment>> getAllPayments() {

        List<Payment> payments = service.getAllPayments();

        return ResponseEntity.ok(payments);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePayment(
            @PathVariable Long id) {

        service.deletePayment(id);

        return ResponseEntity.noContent().build();
    }
}