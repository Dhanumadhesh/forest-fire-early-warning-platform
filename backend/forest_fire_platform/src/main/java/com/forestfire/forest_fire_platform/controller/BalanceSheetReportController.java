package com.forestfire.forest_fire_platform.controller;

import com.forestfire.forest_fire_platform.repository.PaymentRepository;
import com.forestfire.forest_fire_platform.repository.VendorBillRepository;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/forest/reports")
public class BalanceSheetReportController {

    private final PaymentRepository paymentRepository;
    private final VendorBillRepository vendorBillRepository;

    public BalanceSheetReportController(
            PaymentRepository paymentRepository,
            VendorBillRepository vendorBillRepository) {
        this.paymentRepository = paymentRepository;
        this.vendorBillRepository = vendorBillRepository;
    }

    @GetMapping("/balance-sheet")
    public Map<String, Object> getBalanceSheetReport() {

        double totalPayments = paymentRepository.findAll()
                .stream()
                .mapToDouble(payment -> payment.getAmount())
                .sum();

        double unpaidBills = vendorBillRepository.findAll()
                .stream()
                .filter(bill -> "PENDING".equalsIgnoreCase(bill.getStatus()))
                .mapToDouble(bill -> bill.getAmount())
                .sum();

        Map<String, Object> report = new HashMap<>();

        report.put("totalPayments", totalPayments);
        report.put("unpaidSupplierBills", unpaidBills);

        return report;
    }
}