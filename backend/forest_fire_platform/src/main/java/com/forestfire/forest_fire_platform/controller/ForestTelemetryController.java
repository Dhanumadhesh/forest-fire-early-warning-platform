package com.forestfire.forest_fire_platform.controller;

import com.forestfire.forest_fire_platform.entity.ForestTelemetry;
import com.forestfire.forest_fire_platform.service.ForestTelemetryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/forest/telemetry")
public class ForestTelemetryController {

    private final ForestTelemetryService service;

    public ForestTelemetryController(ForestTelemetryService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<ForestTelemetry> createTelemetry(
            @RequestBody ForestTelemetry telemetry) {

        ForestTelemetry savedTelemetry =
                service.createTelemetry(telemetry);

        return ResponseEntity.ok(savedTelemetry);
    }

    @GetMapping
    public ResponseEntity<List<ForestTelemetry>> getAllTelemetry() {

        List<ForestTelemetry> telemetry =
                service.getAllTelemetry();

        return ResponseEntity.ok(telemetry);
    }
}