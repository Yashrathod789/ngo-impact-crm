package com.ngoimpact.crm;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "programmes")
public class Programme {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long tenantId;

    private String name;

    @Column(length = 1000)
    private String description;

    private String programmeType;

    private LocalDate startDate;

    private LocalDate endDate;

    private String status;

    private Integer beneficiaryCount;

    public Programme() {
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

    public String getProgrammeType() {
        return programmeType;
    }

    public void setProgrammeType(String programmeType) {
        this.programmeType = programmeType;
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

    public Integer getBeneficiaryCount() {
        return beneficiaryCount;
    }

    public void setBeneficiaryCount(Integer beneficiaryCount) {
        this.beneficiaryCount = beneficiaryCount;
    }
}