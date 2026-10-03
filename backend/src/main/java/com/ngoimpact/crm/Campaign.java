package com.ngoimpact.crm;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "campaigns")
public class Campaign {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long tenantId;

    private String name;

    @Column(length = 1000)
    private String description;

    private double targetAmount;

    private double amountRaised;

    @Column(length = 3)
    private String currency = "INR";

    private LocalDate startDate;

    private LocalDate endDate;

    private String status;

    public Campaign() {
    }

    public Long getId() {
        return id;
    }

    public Long getTenantId() {
        return tenantId;
    }

    public void setTenantId(Long tenantId) {
        this.tenantId = tenantId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getTargetAmount() {
        return targetAmount;
    }

    public void setTargetAmount(double targetAmount) {
        this.targetAmount = targetAmount;
    }

    public double getAmountRaised() {
        return amountRaised;
    }

    public void setAmountRaised(double amountRaised) {
        this.amountRaised = amountRaised;
    }

    public String getCurrency() {
        return currency == null || currency.isBlank() ? "INR" : currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}