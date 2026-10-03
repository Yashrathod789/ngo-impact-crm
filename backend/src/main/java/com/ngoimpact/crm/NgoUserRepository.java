package com.ngoimpact.crm;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface NgoUserRepository extends JpaRepository<NgoUser, Long> {

    Optional<NgoUser> findByEmail(String email);

    Optional<NgoUser> findByContactNumber(String contactNumber);

    Optional<NgoUser> findByEmailOrContactNumber(
            String email,
            String contactNumber
    );
}