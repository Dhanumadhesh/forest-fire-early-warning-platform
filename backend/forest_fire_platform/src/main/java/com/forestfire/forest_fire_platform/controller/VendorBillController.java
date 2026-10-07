package com.forestfire.forest_fire_platform.controller;

import com.forestfire.forest_fire_platform.entity.VendorBill;
import com.forestfire.forest_fire_platform.service.VendorBillService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/forest/vendor-bills")
public class VendorBillController {

    private final VendorBillService service;

    public VendorBillController(VendorBillService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<VendorBill> createVendorBill(
            @RequestBody VendorBill vendorBill) {

        VendorBill savedBill = service.createVendorBill(vendorBill);

        return ResponseEntity.ok(savedBill);
    }

    @GetMapping
    public ResponseEntity<List<VendorBill>> getAllVendorBills() {

        List<VendorBill> bills = service.getAllVendorBills();

        return ResponseEntity.ok(bills);
    }
}