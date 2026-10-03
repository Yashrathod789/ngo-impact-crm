package com.ngoimpact.crm;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/staff")
@CrossOrigin(origins = "*")
public class StaffController {

    private final StaffRepository staffRepository;

    public StaffController(StaffRepository staffRepository) {
        this.staffRepository = staffRepository;
    }

    @GetMapping
    public List<Staff> getStaff(@RequestParam Long tenantId) {
        return staffRepository.findByTenantId(tenantId);
    }

    @PostMapping
    public Staff createStaff(@RequestBody Staff staff) {

        if (staff.getTenantId() == null) {
            throw new IllegalArgumentException("Tenant ID is required");
        }

        if (staff.getStatus() == null || staff.getStatus().isBlank()) {
            staff.setStatus("Active");
        }

        return staffRepository.save(staff);
    }
}