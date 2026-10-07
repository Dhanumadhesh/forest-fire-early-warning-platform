package com.forestfire.forest_fire_platform.service;

import com.forestfire.forest_fire_platform.entity.ForestSector;
import com.forestfire.forest_fire_platform.repository.ForestSectorRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ForestSectorService {

    private final ForestSectorRepository repository;

    public ForestSectorService(ForestSectorRepository repository) {
        this.repository = repository;
    }

    public ForestSector createSector(ForestSector sector) {
        return repository.save(sector);
    }

    public List<ForestSector> getAllSectors() {
        return repository.findAll();
    }
}