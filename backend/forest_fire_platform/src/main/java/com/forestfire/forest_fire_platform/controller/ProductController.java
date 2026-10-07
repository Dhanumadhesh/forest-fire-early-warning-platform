package com.forestfire.forest_fire_platform.controller;

import com.forestfire.forest_fire_platform.entity.Product;
import com.forestfire.forest_fire_platform.service.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/forest/products")
public class ProductController {

    private final ProductService service;

    public ProductController(ProductService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Product> createProduct(
            @RequestBody Product product) {

        Product savedProduct = service.createProduct(product);

        return ResponseEntity.ok(savedProduct);
    }

    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {

        List<Product> products = service.getAllProducts();

        return ResponseEntity.ok(products);
    }
}