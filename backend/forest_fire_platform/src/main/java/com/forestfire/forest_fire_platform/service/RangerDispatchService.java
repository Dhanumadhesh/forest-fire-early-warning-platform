package com.forestfire.forest_fire_platform.service;

import com.forestfire.forest_fire_platform.entity.RangerDispatch;
import com.forestfire.forest_fire_platform.repository.RangerDispatchRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RangerDispatchService {

    private final RangerDispatchRepository repository;

    public RangerDispatchService(RangerDispatchRepository repository) {
        this.repository = repository;
    }

    public RangerDispatch createDispatch(RangerDispatch dispatch) {
        return repository.save(dispatch);
    }

    public List<RangerDispatch> getAllDispatches() {
        return repository.findAll();
    }
}