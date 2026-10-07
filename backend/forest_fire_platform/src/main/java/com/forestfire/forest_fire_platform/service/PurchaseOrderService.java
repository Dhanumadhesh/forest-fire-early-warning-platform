package com.forestfire.forest_fire_platform.service;

import com.forestfire.forest_fire_platform.entity.PurchaseOrder;
import com.forestfire.forest_fire_platform.repository.PurchaseOrderRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PurchaseOrderService {

    private final PurchaseOrderRepository repository;

    public PurchaseOrderService(PurchaseOrderRepository repository) {
        this.repository = repository;
    }

    public PurchaseOrder createPurchaseOrder(PurchaseOrder purchaseOrder) {
        return repository.save(purchaseOrder);
    }

    public List<PurchaseOrder> getAllPurchaseOrders() {
        return repository.findAll();
    }
}