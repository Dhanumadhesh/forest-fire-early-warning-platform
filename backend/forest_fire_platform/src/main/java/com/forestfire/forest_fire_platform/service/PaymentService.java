package com.forestfire.forest_fire_platform.service;

import com.forestfire.forest_fire_platform.entity.Payment;
import com.forestfire.forest_fire_platform.entity.VendorBill;
import com.forestfire.forest_fire_platform.repository.PaymentRepository;
import com.forestfire.forest_fire_platform.repository.VendorBillRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PaymentService {

    private final PaymentRepository repository;
    private final VendorBillRepository vendorBillRepository;

    public PaymentService(PaymentRepository repository,
                          VendorBillRepository vendorBillRepository) {
        this.repository = repository;
        this.vendorBillRepository = vendorBillRepository;
    }

    public Payment createPayment(Payment payment) {

        Payment savedPayment = repository.save(payment);

        if ("COMPLETED".equalsIgnoreCase(savedPayment.getStatus())
                && savedPayment.getVendorBill() != null
                && savedPayment.getVendorBill().getId() != null) {

            VendorBill bill = vendorBillRepository
                    .findById(savedPayment.getVendorBill().getId())
                    .orElseThrow(() ->
                            new RuntimeException("Vendor bill not found"));

            bill.setStatus("PAID");

            vendorBillRepository.save(bill);
        }

        return savedPayment;
    }

    public List<Payment> getAllPayments() {
        return repository.findAll();
    }

    public void deletePayment(Long id) {
        repository.deleteById(id);
    }
}