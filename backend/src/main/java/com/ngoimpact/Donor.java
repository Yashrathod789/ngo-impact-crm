package com.ngoimpact.crm;

import jakarta.persistence.*;

@Entity
@Table(name = "donors")
public class Donor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long tenantId;

    private String name;

    private String email;

    private String phone;

    private String kycStatus;

    private String kycDocumentType;

    // Default constructor required by JPA
    public Donor() {
    }

    // Get ID
    public Long getId() {
        return id;
    }

    // Get Tenant ID
    public Long getTenantId() {
        return tenantId;
    }

    // Set Tenant ID
    public void setTenantId(Long tenantId) {
        this.tenantId = tenantId;
    }

    // Get Name
    public String getName() {
        return name;
    }

    // Set Name
    public void setName(String name) {
        this.name = name;
    }

    // Get Email
    public String getEmail() {
        return email;
    }

    // Set Email
    public void setEmail(String email) {
        this.email = email;
    }

    // Get Phone
    public String getPhone() {
        return phone;
    }

    // Set Phone
    public void setPhone(String phone) {
        this.phone = phone;
    }

    // Get KYC Status
    public String getKycStatus() {
        return kycStatus;
    }

    // Set KYC Status
    public void setKycStatus(String kycStatus) {
        this.kycStatus = kycStatus;
    }

    // Get KYC Document Type
    public String getKycDocumentType() {
        return kycDocumentType;
    }

    // Set KYC Document Type
    public void setKycDocumentType(String kycDocumentType) {
        this.kycDocumentType = kycDocumentType;
    }
}