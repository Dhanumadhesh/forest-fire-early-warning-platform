package com.forestfire.forest_fire_platform.repository;

import com.forestfire.forest_fire_platform.entity.JournalEntry;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JournalEntryRepository
        extends JpaRepository<JournalEntry, Long> {
}