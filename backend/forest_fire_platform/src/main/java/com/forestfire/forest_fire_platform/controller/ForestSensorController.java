package com.forestfire.forest_fire_platform.controller;

import com.forestfire.forest_fire_platform.entity.ForestSensor;
import com.forestfire.forest_fire_platform.service.ForestSensorService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/forest/sensors")
public class ForestSensorController {

    private final ForestSensorService service;

    public ForestSensorController(ForestSensorService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<ForestSensor> createSensor(
            @RequestBody ForestSensor sensor) {

        ForestSensor savedSensor = service.createSensor(sensor);

        return ResponseEntity.ok(savedSensor);
    }

    @GetMapping
    public ResponseEntity<List<ForestSensor>> getAllSensors() {

        List<ForestSensor> sensors = service.getAllSensors();

        return ResponseEntity.ok(sensors);
    }
}