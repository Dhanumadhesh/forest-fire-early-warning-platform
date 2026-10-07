package com.forestfire.forest_fire_platform.service;

import com.forestfire.forest_fire_platform.entity.ForestSensor;
import com.forestfire.forest_fire_platform.repository.ForestSensorRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ForestSensorService {

    private final ForestSensorRepository repository;

    public ForestSensorService(ForestSensorRepository repository) {
        this.repository = repository;
    }

    public ForestSensor createSensor(ForestSensor sensor) {
        return repository.save(sensor);
    }

    public List<ForestSensor> getAllSensors() {
        return repository.findAll();
    }
}