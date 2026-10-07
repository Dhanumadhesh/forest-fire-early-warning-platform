package com.forestfire.forest_fire_platform.repository;

import com.forestfire.forest_fire_platform.entity.ForestTelemetry;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ForestTelemetryRepository extends JpaRepository<ForestTelemetry, Long> {
}