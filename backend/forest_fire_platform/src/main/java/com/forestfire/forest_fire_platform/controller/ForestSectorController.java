package com.forestfire.forest_fire_platform.controller;

import com.forestfire.forest_fire_platform.entity.ForestSector;
import com.forestfire.forest_fire_platform.service.ForestSectorService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/forest/sectors")
public class ForestSectorController {

    private final ForestSectorService service;

    public ForestSectorController(ForestSectorService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<ForestSector> createSector(
            @RequestBody ForestSector sector) {

        ForestSector savedSector = service.createSector(sector);

        return ResponseEntity.ok(savedSector);
    }

    @GetMapping
    public ResponseEntity<List<ForestSector>> getAllSectors() {

        List<ForestSector> sectors = service.getAllSectors();

        return ResponseEntity.ok(sectors);
    }
}