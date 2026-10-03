package com.ngoimpact.crm;

import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/audit-logs")
@CrossOrigin(origins = "*")
public class AuditLogController {

    private final AuditLogRepository auditLogRepository;

    public AuditLogController(AuditLogRepository auditLogRepository) {
        this.auditLogRepository = auditLogRepository;
    }

    @GetMapping
    public List<AuditLog> getAuditLogs(@RequestParam Long tenantId) {
        return auditLogRepository.findByTenantIdOrderByCreatedAtDesc(tenantId);
    }

    @PostMapping
    public AuditLog createAuditLog(@RequestBody AuditLog auditLog) {

        if (auditLog.getTenantId() == null) {
            throw new IllegalArgumentException("Tenant ID is required");
        }

        if (auditLog.getCreatedAt() == null) {
            auditLog.setCreatedAt(LocalDateTime.now());
        }

        return auditLogRepository.save(auditLog);
    }
}