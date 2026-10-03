package com.ngoimpact.crm;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/campaigns")
@CrossOrigin(origins = "*")
public class CampaignController {

    private final CampaignRepository campaignRepository;

    public CampaignController(CampaignRepository campaignRepository) {
        this.campaignRepository = campaignRepository;
    }

    @GetMapping
    public List<Campaign> getAllCampaigns(@RequestParam Long tenantId) {
        return campaignRepository.findByTenantId(tenantId);
    }

    @PostMapping
    public Campaign createCampaign(@RequestBody Campaign campaign) {

        if (campaign.getTenantId() == null) {
            campaign.setTenantId(1L);
        }

        if (campaign.getStatus() == null ||
                campaign.getStatus().isBlank()) {
            campaign.setStatus("Active");
        }

        if (campaign.getCurrency() == null || campaign.getCurrency().isBlank()) {
            campaign.setCurrency("INR");
        }

        if (!"INR".equals(campaign.getCurrency()) && !"USD".equals(campaign.getCurrency())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Currency must be INR or USD.");
        }

        if (campaign.getAmountRaised() < 0) {
            campaign.setAmountRaised(0);
        }

        return campaignRepository.save(campaign);
    }
}