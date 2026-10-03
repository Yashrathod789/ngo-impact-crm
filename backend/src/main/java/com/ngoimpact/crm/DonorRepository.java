
package com.ngoimpact.crm;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface DonorRepository extends JpaRepository<Donor, Long> {
    List<Donor> findByTenantId(Long tenantId);
}