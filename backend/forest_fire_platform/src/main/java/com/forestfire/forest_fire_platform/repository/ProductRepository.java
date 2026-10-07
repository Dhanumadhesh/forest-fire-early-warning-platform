package com.forestfire.forest_fire_platform.repository;

import com.forestfire.forest_fire_platform.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}