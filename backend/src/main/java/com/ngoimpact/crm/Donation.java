package com.ngoimpact.crm;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "donations")
public class Donation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long donorId;
    private Long campaignId;
    private Long tenantId;
    private double amount;
    @Column(length = 3)
    private String currency = "INR";
    private LocalDate donationDate;

    public Donation() {
    }

    public Long getId() {
        return id;
    }

    public Long getDonorId() {
        return donorId;
    }

    public void setDonorId(Long donorId) {
        this.donorId = donorId;
    }

    public Long getCampaignId() {
        return campaignId;
    }

    public void setCampaignId(Long campaignId) {
        this.campaignId = campaignId;
    }

    public Long getTenantId() {
        return tenantId;
    }

    public void setTenantId(Long tenantId) {
        this.tenantId = tenantId;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public String getCurrency() {
        return currency == null || currency.isBlank() ? "INR" : currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public LocalDate getDonationDate() {
        return donationDate;
    }

    public void setDonationDate(LocalDate donationDate) {
        this.donationDate = donationDate;
    }
}