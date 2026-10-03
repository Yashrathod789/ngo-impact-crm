package com.ngoimpact.crm;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/ngo")
@CrossOrigin(origins = "*")
public class NgoUserController {

    private final NgoUserRepository ngoUserRepository;

    public NgoUserController(NgoUserRepository ngoUserRepository) {
        this.ngoUserRepository = ngoUserRepository;
    }

    @GetMapping
    public List<NgoUser> getAllNgoUsers() {
        return ngoUserRepository.findAll();
    }

    @PostMapping("/register")
    public NgoUser registerNgo(@RequestBody NgoUser ngoUser) {

        if (ngoUser.getTenantId() == null) {
            ngoUser.setTenantId(1L);
        }

        return ngoUserRepository.save(ngoUser);
    }

    @PostMapping("/login")
    public NgoUser loginNgo(@RequestBody NgoUser loginRequest) {

        String loginValue = loginRequest.getEmail();

        NgoUser user = ngoUserRepository
                .findByEmailOrContactNumber(loginValue, loginValue)
                .orElseThrow(() ->
                        new RuntimeException("Invalid email/contact or password")
                );

        if (!user.getPassword().equals(loginRequest.getPassword())) {
            throw new RuntimeException("Invalid email/contact or password");
        }

        return user;
    }

    // Change password endpoint
    // Request body: { email, currentPassword, newPassword, confirmNewPassword }
    @PostMapping("/change-password")
    public ResponseEntity<Map<String, String>> changePassword(
            @RequestBody Map<String, String> request) {

        String email           = request.get("email");
        String currentPassword = request.get("currentPassword");
        String newPassword     = request.get("newPassword");
        String confirmPassword = request.get("confirmNewPassword");

        if (email == null || currentPassword == null
                || newPassword == null || confirmPassword == null) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "All fields are required."));
        }

        if (!newPassword.equals(confirmPassword)) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "New passwords do not match."));
        }

        NgoUser user = ngoUserRepository.findByEmail(email)
                .orElse(null);

        if (user == null) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "User not found."));
        }

        if (!user.getPassword().equals(currentPassword)) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "Current password is incorrect."));
        }

        user.setPassword(newPassword);
        ngoUserRepository.save(user);

        return ResponseEntity.ok(Map.of("message", "Password changed successfully."));
    }
}