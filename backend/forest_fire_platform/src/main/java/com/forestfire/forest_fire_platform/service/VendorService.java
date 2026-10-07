package com.forestfire.forest_fire_platform.service;

import com.forestfire.forest_fire_platform.entity.Vendor;
import com.forestfire.forest_fire_platform.repository.VendorRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VendorService {

    private final VendorRepository repository;

    public VendorService(VendorRepository repository) {
        this.repository = repository;
    }

    public Vendor createVendor(Vendor vendor) {
        return repository.save(vendor);
    }

    public List<Vendor> getAllVendors() {
        return repository.findAll();
    }
}