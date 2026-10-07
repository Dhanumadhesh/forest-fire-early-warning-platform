package com.forestfire.forest_fire_platform.controller;

import com.forestfire.forest_fire_platform.entity.Grant;
import com.forestfire.forest_fire_platform.entity.JournalEntry;
import com.forestfire.forest_fire_platform.repository.GrantRepository;
import com.forestfire.forest_fire_platform.repository.JournalEntryRepository;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/forest/reports")
public class ProfitLossReportController {

    private final GrantRepository grantRepository;
    private final JournalEntryRepository journalEntryRepository;

    public ProfitLossReportController(
            GrantRepository grantRepository,
            JournalEntryRepository journalEntryRepository) {
        this.grantRepository = grantRepository;
        this.journalEntryRepository = journalEntryRepository;
    }

    @GetMapping("/profit-loss")
    public Map<String, Object> getProfitLossReport() {

        List<Grant> grants = grantRepository.findAll();
        List<JournalEntry> entries = journalEntryRepository.findAll();

        double totalGrantRevenue = grants.stream()
                .mapToDouble(Grant::getAmount)
                .sum();

        double totalExpenses = entries.stream()
                .filter(entry -> "DEBIT".equalsIgnoreCase(entry.getEntryType()))
                .mapToDouble(JournalEntry::getAmount)
                .sum();

        double netResult = totalGrantRevenue - totalExpenses;

        Map<String, Object> report = new HashMap<>();

        report.put("totalGrantRevenue", totalGrantRevenue);
        report.put("totalExpenses", totalExpenses);
        report.put("netResult", netResult);

        return report;
    }
}