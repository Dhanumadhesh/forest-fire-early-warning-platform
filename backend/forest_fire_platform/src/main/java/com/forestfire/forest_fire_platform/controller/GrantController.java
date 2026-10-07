package com.forestfire.forest_fire_platform.controller;

import com.forestfire.forest_fire_platform.entity.Grant;
import com.forestfire.forest_fire_platform.service.GrantService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/forest/grants")
public class GrantController {

    private final GrantService service;

    public GrantController(GrantService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Grant> createGrant(
            @RequestBody Grant grant) {

        Grant savedGrant = service.createGrant(grant);

        return ResponseEntity.ok(savedGrant);
    }

    @GetMapping
    public ResponseEntity<List<Grant>> getAllGrants() {

        List<Grant> grants = service.getAllGrants();

        return ResponseEntity.ok(grants);
    }
}