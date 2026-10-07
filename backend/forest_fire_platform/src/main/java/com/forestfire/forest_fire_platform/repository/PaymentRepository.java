package com.forestfire.forest_fire_platform.repository;

import com.forestfire.forest_fire_platform.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
}