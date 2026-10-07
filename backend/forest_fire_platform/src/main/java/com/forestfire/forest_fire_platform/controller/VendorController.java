package com.forestfire.forest_fire_platform.controller;

import com.forestfire.forest_fire_platform.entity.Vendor;
import com.forestfire.forest_fire_platform.service.VendorService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/forest/vendors")
public class VendorController {

    private final VendorService service;

    public VendorController(VendorService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Vendor> createVendor(
            @RequestBody Vendor vendor) {

        Vendor savedVendor = service.createVendor(vendor);

        return ResponseEntity.ok(savedVendor);
    }

    @GetMapping
    public ResponseEntity<List<Vendor>> getAllVendors() {

        List<Vendor> vendors = service.getAllVendors();

        return ResponseEntity.ok(vendors);
    }
}