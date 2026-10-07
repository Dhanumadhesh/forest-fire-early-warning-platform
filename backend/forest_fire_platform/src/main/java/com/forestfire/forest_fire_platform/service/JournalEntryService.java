package com.forestfire.forest_fire_platform.service;

import com.forestfire.forest_fire_platform.entity.JournalEntry;
import com.forestfire.forest_fire_platform.repository.JournalEntryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JournalEntryService {

    private final JournalEntryRepository repository;

    public JournalEntryService(JournalEntryRepository repository) {
        this.repository = repository;
    }

    public JournalEntry createJournalEntry(JournalEntry journalEntry) {
        return repository.save(journalEntry);
    }

    public List<JournalEntry> getAllJournalEntries() {
        return repository.findAll();
    }

    public void deleteJournalEntry(Long id) {
        repository.deleteById(id);
    }
}