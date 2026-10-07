package com.forestfire.forest_fire_platform.service;

import com.forestfire.forest_fire_platform.entity.FireAlarm;
import com.forestfire.forest_fire_platform.entity.ForestTelemetry;
import com.forestfire.forest_fire_platform.repository.FireAlarmRepository;
import com.forestfire.forest_fire_platform.repository.ForestTelemetryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ForestTelemetryService {

    private final ForestTelemetryRepository telemetryRepository;
    private final FireAlarmRepository alarmRepository;

    public ForestTelemetryService(
            ForestTelemetryRepository telemetryRepository,
            FireAlarmRepository alarmRepository) {

        this.telemetryRepository = telemetryRepository;
        this.alarmRepository = alarmRepository;
    }

    public ForestTelemetry createTelemetry(ForestTelemetry telemetry) {

        ForestTelemetry savedTelemetry =
                telemetryRepository.save(telemetry);

        if (telemetry.getTemperature() > 45 &&
            telemetry.getSmokeLevel() > 50) {

            FireAlarm alarm = new FireAlarm();

            alarm.setTemperature(telemetry.getTemperature());
            alarm.setSmokeLevel(telemetry.getSmokeLevel());
            alarm.setStatus("ACTIVE");
            alarm.setSensor(telemetry.getSensor());

            alarmRepository.save(alarm);
        }

        return savedTelemetry;
    }

    public List<ForestTelemetry> getAllTelemetry() {
        return telemetryRepository.findAll();
    }
}