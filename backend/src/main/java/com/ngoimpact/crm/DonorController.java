package com.ngoimpact.crm;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/donors")
@CrossOrigin(origins = "*")
public class DonorController {

    private final DonorRepository donorRepository;

    public DonorController(DonorRepository donorRepository) {
        this.donorRepository = donorRepository;
    }

    // Get all donors
    
@GetMapping
public List<Donor> getAllDonors(@RequestParam Long tenantId) {
    return donorRepository.findByTenantId(tenantId);
}

    // Add a new donor
    @PostMapping
    public Donor createDonor(@RequestBody Donor donor) {

        // Default KYC status
        if (donor.getKycStatus() == null ||
                donor.getKycStatus().isBlank()) {
            donor.setKycStatus("Pending");
        }

        return donorRepository.save(donor);
    }
}