package com.forestfire.forest_fire_platform.controller;

import com.forestfire.forest_fire_platform.entity.JournalEntry;
import com.forestfire.forest_fire_platform.service.JournalEntryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/forest/journal-entries")
public class JournalEntryController {

    private final JournalEntryService service;

    public JournalEntryController(JournalEntryService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<JournalEntry> createJournalEntry(
            @RequestBody JournalEntry journalEntry) {

        JournalEntry savedEntry =
                service.createJournalEntry(journalEntry);

        return ResponseEntity.ok(savedEntry);
    }

    @GetMapping
    public ResponseEntity<List<JournalEntry>> getAllJournalEntries() {

        List<JournalEntry> entries =
                service.getAllJournalEntries();

        return ResponseEntity.ok(entries);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteJournalEntry(
            @PathVariable Long id) {

        service.deleteJournalEntry(id);

        return ResponseEntity.noContent().build();
    }
}