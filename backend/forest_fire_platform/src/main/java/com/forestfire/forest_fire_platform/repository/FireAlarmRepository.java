package com.forestfire.forest_fire_platform.repository;

import com.forestfire.forest_fire_platform.entity.FireAlarm;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FireAlarmRepository extends JpaRepository<FireAlarm, Long> {
}