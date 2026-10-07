package com.forestfire.forest_fire_platform.repository;

import com.forestfire.forest_fire_platform.entity.ForestSensor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ForestSensorRepository extends JpaRepository<ForestSensor, Long> {
}