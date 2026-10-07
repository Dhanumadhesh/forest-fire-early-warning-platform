package com.forestfire.forest_fire_platform.entity;

import jakarta.persistence.*;

@Entity
public class RangerDispatch {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String rangerTeam;
    private String vehicleNumber;
    private String status;

    @ManyToOne
    @JoinColumn(name = "alarm_id")
    private FireAlarm alarm;

    public RangerDispatch() {
    }

    public RangerDispatch(String rangerTeam, String vehicleNumber,
                          String status, FireAlarm alarm) {
        this.rangerTeam = rangerTeam;
        this.vehicleNumber = vehicleNumber;
        this.status = status;
        this.alarm = alarm;
    }

    public Long getId() {
        return id;
    }

    public String getRangerTeam() {
        return rangerTeam;
    }

    public void setRangerTeam(String rangerTeam) {
        this.rangerTeam = rangerTeam;
    }

    public String getVehicleNumber() {
        return vehicleNumber;
    }

    public void setVehicleNumber(String vehicleNumber) {
        this.vehicleNumber = vehicleNumber;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public FireAlarm getAlarm() {
        return alarm;
    }

    public void setAlarm(FireAlarm alarm) {
        this.alarm = alarm;
    }
}