package com.ngoimpact.crm;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProgrammeRepository extends JpaRepository<Programme, Long> {

    List<Programme> findByTenantId(Long tenantId);
}