package com.forestfire.forest_fire_platform.entity;

import jakarta.persistence.*;

@Entity
public class FireAlarm {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private double temperature;
    private double smokeLevel;
    private String status;

    @ManyToOne
    @JoinColumn(name = "sensor_id")
    private ForestSensor sensor;

    public FireAlarm() {
    }

    public FireAlarm(double temperature, double smokeLevel,
                     String status, ForestSensor sensor) {
        this.temperature = temperature;
        this.smokeLevel = smokeLevel;
        this.status = status;
        this.sensor = sensor;
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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public ForestSensor getSensor() {
        return sensor;
    }

    public void setSensor(ForestSensor sensor) {
        this.sensor = sensor;
    }
}