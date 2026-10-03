package com.ngoimpact.crm;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tenants")
@CrossOrigin(origins = "*")
public class TenantController {

    private final TenantRepository tenantRepository;

    public TenantController(TenantRepository tenantRepository) {
        this.tenantRepository = tenantRepository;
    }

    @GetMapping
    public List<Tenant> getAllTenants() {
        return tenantRepository.findAll();
    }

    @PostMapping
    public Tenant createTenant(@RequestBody Tenant tenant) {
        return tenantRepository.save(tenant);
    }
}