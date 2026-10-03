package com.ngoimpact.crm;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/receipts")
@CrossOrigin(origins = "*")
public class ReceiptController {

    private final ReceiptRepository receiptRepository;

    public ReceiptController(ReceiptRepository receiptRepository) {
        this.receiptRepository = receiptRepository;
    }

    @GetMapping
    public List<Receipt> getAllReceipts(@RequestParam Long tenantId) {
        return receiptRepository.findByTenantId(tenantId);
    }

    @PostMapping
    public ResponseEntity<?> createReceipt(@RequestBody Receipt receipt) {
        if (receipt.getDonationId() == null) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "Donation ID is required."));
        }

        if (receipt.getCurrency() == null || receipt.getCurrency().isBlank()) {
            receipt.setCurrency("INR");
        }

        if (!"INR".equals(receipt.getCurrency()) && !"USD".equals(receipt.getCurrency())) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "Currency must be INR or USD."));
        }

        if (receiptRepository.existsByDonationId(receipt.getDonationId())) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("error", "A receipt already exists for this donation."));
        }

        if (receipt.getReceiptNumber() == null ||
                receipt.getReceiptNumber().isBlank()) {

            receipt.setReceiptNumber(
                    "REC-" + System.currentTimeMillis()
            );
        }

        if (receipt.getReceiptDate() == null) {
            receipt.setReceiptDate(LocalDate.now());
        }

        return ResponseEntity.ok(receiptRepository.save(receipt));
    }
}