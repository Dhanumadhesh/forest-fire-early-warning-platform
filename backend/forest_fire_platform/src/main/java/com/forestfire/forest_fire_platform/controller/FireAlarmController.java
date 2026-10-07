package com.forestfire.forest_fire_platform.controller;

import com.forestfire.forest_fire_platform.entity.FireAlarm;
import com.forestfire.forest_fire_platform.service.FireAlarmService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/forest/alarms")
public class FireAlarmController {

    private final FireAlarmService service;

    public FireAlarmController(FireAlarmService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<FireAlarm> createAlarm(
            @RequestBody FireAlarm alarm) {

        FireAlarm savedAlarm = service.createAlarm(alarm);

        return ResponseEntity.ok(savedAlarm);
    }

    @GetMapping
    public ResponseEntity<List<FireAlarm>> getAllAlarms() {

        List<FireAlarm> alarms = service.getAllAlarms();

        return ResponseEntity.ok(alarms);
    }
}