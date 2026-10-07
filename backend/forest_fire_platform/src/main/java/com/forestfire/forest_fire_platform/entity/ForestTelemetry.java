package com.forestfire.forest_fire_platform.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class ForestTelemetry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private double temperature;
    private double smokeLevel;

    private LocalDateTime recordedAt;

    @ManyToOne
    @JoinColumn(name = "sensor_id")
    private ForestSensor sensor;

    public ForestTelemetry() {
    }

    public ForestTelemetry(double temperature, double smokeLevel, ForestSensor sensor) {
        this.temperature = temperature;
        this.smokeLevel = smokeLevel;
        this.sensor = sensor;
    }

    @PrePersist
    protected void onCreate() {
        if (recordedAt == null) {
            recordedAt = LocalDateTime.now();
        }
    }

    public Long getId() {
        return id;
    }

    public double getTemperature() {
        return temperature;
    }

    public void setTemperature(double temperature) {
        this.temperature = temperature;
    }

    public double getSmokeLevel() {
        return smokeLevel;
    }

    public void setSmokeLevel(double smokeLevel) {
        this.smokeLevel = smokeLevel;
    }

    public LocalDateTime getRecordedAt() {
        return recordedAt;
    }

    public void setRecordedAt(LocalDateTime recordedAt) {
        this.recordedAt = recordedAt;
    }

    public ForestSensor getSensor() {
        return sensor;
    }

    public void setSensor(ForestSensor sensor) {
        this.sensor = sensor;
    }
}