package com.forestfire.forest_fire_platform.service;

import com.forestfire.forest_fire_platform.entity.VendorBill;
import com.forestfire.forest_fire_platform.repository.VendorBillRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VendorBillService {

    private final VendorBillRepository repository;

    public VendorBillService(VendorBillRepository repository) {
        this.repository = repository;
    }

    public VendorBill createVendorBill(VendorBill vendorBill) {
        return repository.save(vendorBill);
    }

    public List<VendorBill> getAllVendorBills() {
        return repository.findAll();
    }
}