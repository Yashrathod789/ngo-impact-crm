package com.ngoimpact.crm;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ReceiptRepository extends JpaRepository<Receipt, Long> {
    List<Receipt> findByTenantId(Long tenantId);

    boolean existsByDonationId(Long donationId);
}