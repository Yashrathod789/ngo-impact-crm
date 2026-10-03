package com.ngoimpact.crm;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/programmes")
@CrossOrigin(origins = "*")
public class ProgrammeController {

    private final ProgrammeRepository programmeRepository;

    public ProgrammeController(ProgrammeRepository programmeRepository) {
        this.programmeRepository = programmeRepository;
    }

   @GetMapping
public List<Programme> getAllProgrammes(@RequestParam Long tenantId) {
    return programmeRepository.findByTenantId(tenantId);
}
    @PostMapping
    public Programme createProgramme(@RequestBody Programme programme) {

        if (programme.getStatus() == null ||
                programme.getStatus().isBlank()) {

            programme.setStatus("Active");
        }

        if (programme.getBeneficiaryCount() == null ||
                programme.getBeneficiaryCount() < 0) {

            programme.setBeneficiaryCount(0);
        }

        return programmeRepository.save(programme);
    }
}