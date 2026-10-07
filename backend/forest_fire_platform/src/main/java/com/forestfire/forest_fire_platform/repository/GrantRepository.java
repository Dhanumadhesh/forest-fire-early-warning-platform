package com.forestfire.forest_fire_platform.repository;

import com.forestfire.forest_fire_platform.entity.Grant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GrantRepository extends JpaRepository<Grant, Long> {
}