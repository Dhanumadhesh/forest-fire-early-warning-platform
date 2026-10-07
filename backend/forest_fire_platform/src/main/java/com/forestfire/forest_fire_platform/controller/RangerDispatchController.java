package com.forestfire.forest_fire_platform.controller;

import com.forestfire.forest_fire_platform.entity.RangerDispatch;
import com.forestfire.forest_fire_platform.service.RangerDispatchService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/forest/dispatches")
public class RangerDispatchController {

    private final RangerDispatchService service;

    public RangerDispatchController(RangerDispatchService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<RangerDispatch> createDispatch(
            @RequestBody RangerDispatch dispatch) {

        RangerDispatch savedDispatch =
                service.createDispatch(dispatch);

        return ResponseEntity.ok(savedDispatch);
    }

    @GetMapping
    public ResponseEntity<List<RangerDispatch>> getAllDispatches() {

        List<RangerDispatch> dispatches =
                service.getAllDispatches();

        return ResponseEntity.ok(dispatches);
    }
}