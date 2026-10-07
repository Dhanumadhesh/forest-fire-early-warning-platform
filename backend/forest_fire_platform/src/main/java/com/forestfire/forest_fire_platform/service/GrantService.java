package com.forestfire.forest_fire_platform.service;

import com.forestfire.forest_fire_platform.entity.Grant;
import com.forestfire.forest_fire_platform.repository.GrantRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GrantService {

    private final GrantRepository repository;

    public GrantService(GrantRepository repository) {
        this.repository = repository;
    }

    public Grant createGrant(Grant grant) {
        return repository.save(grant);
    }

    public List<Grant> getAllGrants() {
        return repository.findAll();
    }
}