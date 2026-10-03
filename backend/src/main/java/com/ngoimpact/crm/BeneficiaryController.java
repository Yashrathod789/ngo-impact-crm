package com.ngoimpact.crm;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/beneficiaries")
@CrossOrigin(origins = "*")
public class BeneficiaryController {

    private final BeneficiaryRepository beneficiaryRepository;

    public BeneficiaryController(BeneficiaryRepository beneficiaryRepository) {
        this.beneficiaryRepository = beneficiaryRepository;
    }

   @GetMapping
public List<Beneficiary> getAllBeneficiaries(@RequestParam Long tenantId) {
    return beneficiaryRepository.findByTenantId(tenantId);
}

    @PostMapping
    public Beneficiary createBeneficiary(
            @RequestBody Beneficiary beneficiary) {

        if (beneficiary.getStatus() == null ||
            beneficiary.getStatus().isBlank()) {
            beneficiary.setStatus("Active");
        }

        if (beneficiary.getAge() == null ||
            beneficiary.getAge() < 0) {
            beneficiary.setAge(0);
        }

        if (beneficiary.getRegistrationDate() == null) {
            beneficiary.setRegistrationDate(
                java.time.LocalDate.now()
            );
        }

        return beneficiaryRepository.save(beneficiary);
    }
}