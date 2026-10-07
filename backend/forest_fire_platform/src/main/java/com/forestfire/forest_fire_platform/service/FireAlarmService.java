package com.forestfire.forest_fire_platform.service;

import com.forestfire.forest_fire_platform.entity.FireAlarm;
import com.forestfire.forest_fire_platform.repository.FireAlarmRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FireAlarmService {

    private final FireAlarmRepository repository;

    public FireAlarmService(FireAlarmRepository repository) {
        this.repository = repository;
    }

    public FireAlarm createAlarm(FireAlarm alarm) {
        return repository.save(alarm);
    }

    public List<FireAlarm> getAllAlarms() {
        return repository.findAll();
    }
}