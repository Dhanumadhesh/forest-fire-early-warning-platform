package com.forestfire.forest_fire_platform.controller;

import com.forestfire.forest_fire_platform.entity.PurchaseOrder;
import com.forestfire.forest_fire_platform.service.PurchaseOrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/forest/purchase-orders")
public class PurchaseOrderController {

    private final PurchaseOrderService service;

    public PurchaseOrderController(PurchaseOrderService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<PurchaseOrder> createPurchaseOrder(
            @RequestBody PurchaseOrder purchaseOrder) {

        PurchaseOrder savedPurchaseOrder =
                service.createPurchaseOrder(purchaseOrder);

        return ResponseEntity.ok(savedPurchaseOrder);
    }

    @GetMapping
    public ResponseEntity<List<PurchaseOrder>> getAllPurchaseOrders() {

        List<PurchaseOrder> purchaseOrders =
                service.getAllPurchaseOrders();

        return ResponseEntity.ok(purchaseOrders);
    }
}