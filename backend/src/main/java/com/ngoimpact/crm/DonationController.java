package com.ngoimpact.crm;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/donations")
@CrossOrigin(origins = "*")
public class DonationController {

    private final DonationRepository donationRepository;
    private final CampaignRepository campaignRepository;

    public DonationController(DonationRepository donationRepository, CampaignRepository campaignRepository) {
        this.donationRepository = donationRepository;
        this.campaignRepository = campaignRepository;
    }

    @GetMapping
    public List<Donation> getAllDonations(@RequestParam Long tenantId) {
        return donationRepository.findByTenantId(tenantId);
    }

    @PostMapping
    @Transactional
    public ResponseEntity<?> createDonation(@RequestBody Donation donation) {
        if (donation.getCurrency() == null || donation.getCurrency().isBlank()) {
            donation.setCurrency("INR");
        }

        if (!"INR".equals(donation.getCurrency()) && !"USD".equals(donation.getCurrency())) {
            return ResponseEntity.badRequest()
                    .body(java.util.Map.of("error", "Currency must be INR or USD."));
        }

        Campaign campaign = donation.getCampaignId() == null
                ? null
                : campaignRepository.findById(donation.getCampaignId()).orElse(null);

        if (campaign != null && !campaign.getCurrency().equals(donation.getCurrency())) {
            return ResponseEntity.badRequest()
                    .body(java.util.Map.of("error", "Donation currency must match the selected campaign."));
        }

        Donation savedDonation = donationRepository.save(donation);

        if (campaign != null) {
            campaign.setAmountRaised(campaign.getAmountRaised() + donation.getAmount());
            campaignRepository.save(campaign);
        }

        return ResponseEntity.ok(savedDonation);
    }
}