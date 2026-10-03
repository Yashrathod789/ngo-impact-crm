package com.ngoimpact.crm;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface StaffRepository extends JpaRepository<Staff, Long> {

    List<Staff> findByTenantId(Long tenantId);
}