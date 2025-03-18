package com.example.demo.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000") // Allow React frontend
public class DrugController {

    @GetMapping("/drug")
    public ResponseEntity<String> getDrugData(@RequestParam String id) {
        String apiUrl = "https://health-products.canada.ca/api/drug/drugproduct/?lang=en&type=json&id=" + id;

        RestTemplate restTemplate = new RestTemplate();
        String response = restTemplate.getForObject(apiUrl, String.class);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/drugs")
    public ResponseEntity<String> getAllDrugData() {
        String apiUrl = "https://health-products.canada.ca/api/drug/drugproduct/?lang=en&type=json";

        RestTemplate restTemplate = new RestTemplate();
        String response = restTemplate.getForObject(apiUrl, String.class);

        return ResponseEntity.ok(response);
    }
}