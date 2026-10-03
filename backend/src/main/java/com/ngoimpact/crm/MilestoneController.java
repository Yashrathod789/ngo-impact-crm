package com.ngoimpact.crm;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/milestones")
@CrossOrigin(origins = "*")
public class MilestoneController {

    private final MilestoneRepository milestoneRepository;

    public MilestoneController(MilestoneRepository milestoneRepository) {
        this.milestoneRepository = milestoneRepository;
    }

    @GetMapping
public List<Milestone> getAllMilestones(@RequestParam Long tenantId) {
    return milestoneRepository.findByTenantId(tenantId);
}

    @PostMapping
    public Milestone createMilestone(
            @RequestBody Milestone milestone) {

        if (milestone.getStatus() == null ||
            milestone.getStatus().isBlank()) {
            milestone.setStatus("Pending");
        }

        if (milestone.getTargetCount() == null ||
            milestone.getTargetCount() < 0) {
            milestone.setTargetCount(0);
        }

        if (milestone.getCompletedCount() == null ||
            milestone.getCompletedCount() < 0) {
            milestone.setCompletedCount(0);
        }

        if (milestone.getCompletedCount() >
            milestone.getTargetCount()) {
            milestone.setCompletedCount(
                milestone.getTargetCount()
            );
        }

  if (milestone.getTenantId() == null) {
    throw new IllegalArgumentException("Tenant ID is required");
}
return milestoneRepository.save(milestone);
    }
}