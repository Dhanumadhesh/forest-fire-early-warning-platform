package com.forestfire.forest_fire_platform.repository;

import com.forestfire.forest_fire_platform.entity.PurchaseOrder;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PurchaseOrderRepository
        extends JpaRepository<PurchaseOrder, Long> {
}