package com.forestfire.forest_fire_platform.repository;

import com.forestfire.forest_fire_platform.entity.Vendor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VendorRepository extends JpaRepository<Vendor, Long> {
}