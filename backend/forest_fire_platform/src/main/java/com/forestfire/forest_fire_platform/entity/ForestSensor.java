package com.forestfire.forest_fire_platform.entity;

import jakarta.persistence.*;

@Entity
public class ForestSensor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String sensorName;
    private String sensorType;
    private String status;

    @ManyToOne
    @JoinColumn(name = "sector_id")
    private ForestSector sector;

    public ForestSensor() {
    }

    public ForestSensor(String sensorName, String sensorType, String status, ForestSector sector) {
        this.sensorName = sensorName;
        this.sensorType = sensorType;
        this.status = status;
        this.sector = sector;
    }

    public Long getId() {
        return id;
    }

    public String getSensorName() {
        return sensorName;
    }

    public void setSensorName(String sensorName) {
        this.sensorName = sensorName;
    }

    public String getSensorType() {
        return sensorType;
    }

    public void setSensorType(String sensorType) {
        this.sensorType = sensorType;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public ForestSector getSector() {
        return sector;
    }

    public void setSector(ForestSector sector) {
        this.sector = sector;
    }
}