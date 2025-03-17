// This code was generated with assistance chatGPT.
// prompt: How Can I connect front and backend(Java)?
//         API Key will receive from front.

package com.example.demo.controller;

import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@RestController
@RequestMapping("/api/gemini") 
public class GeminiController {

    private static final String GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateText?key=";

    @PostMapping
    public ResponseEntity<String> getGeminiResponse(@RequestBody Map<String, String> request) {
        try {
            RestTemplate restTemplate = new RestTemplate();
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            // Receive API key from frontend
            String userApiKey = request.get("apiKey");
            if (userApiKey == null || userApiKey.isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("API Key is required");
            }

            String requestBody = "{\"prompt\": {\"text\": \"" + request.get("userInput") + "\"}}";
            HttpEntity<String> entity = new HttpEntity<>(requestBody, headers);

            // Send a request with API Key from frontend
            ResponseEntity<String> response = restTemplate.exchange(
                GEMINI_API_URL + userApiKey,
                HttpMethod.POST,
                entity,
                String.class
            );

            return ResponseEntity.ok(response.getBody());

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }
}
