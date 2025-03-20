// This code was generated with assistance from ChatGPT.
// Prompt: How can I connect frontend and backend (Java)?
//         The API Key will be received from the frontend.

package com.example.demo.controller;

import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@RestController // Marks this class as a REST controller to handle HTTP requests
@RequestMapping("/api/gemini") // Defines the base path for this API endpoint
@CrossOrigin(origins = "http://localhost:3000") // Allows cross-origin requests from the frontend running on localhost:3000
public class GeminiController {

    // The Google Gemini API endpoint for generating text content
    private static final String GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

    @PostMapping // Handles HTTP POST requests at the "/api/gemini" endpoint
    public ResponseEntity<String> getGeminiResponse(@RequestBody Map<String, String> request) {
        try {
            RestTemplate restTemplate = new RestTemplate(); // Used to send HTTP requests
            HttpHeaders headers = new HttpHeaders(); // HTTP headers for the request
            headers.setContentType(MediaType.APPLICATION_JSON); // Sets the request content type to JSON

            // Extracts the API Key from the request body sent by the frontend
            String userApiKey = request.get("apiKey");
            if (userApiKey == null || userApiKey.isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("API Key is required");
            }

            // Extracts the user input from the request body
            String userInput = request.get("userInput");
            if (userInput == null || userInput.isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User input is required");
            }

            // Basic prompt be an medical expert
            String systemPrompt = """
                You are an AI medical assistant trained to provide medical advice based on general medical knowledge.
                Your goal is to help users with medical-related questions, such as symptoms, conditions, treatments, 
                medications, and health guidance. If a question is not related to medical topics, politely refuse 
                to answer and ask the user to ask a medical-related question. Always remind users that AI is not a 
                substitute for a doctor and they should consult a healthcare professional for serious concerns.
                
                If the user's question is about symptoms and they need a more detailed analysis, suggest using 
                the Health Assessment tool. Encourage them to provide additional details about their symptoms 
                (e.g., duration, severity, associated symptoms) and include a suggestion to visit the Health 
                Assessment page for a structured symptom analysis.
                """;
            
            // Formats the user input into the correct JSON structure for Google Gemini API
            String requestBody = String.format(
                """
                {
                  "contents": [
                    {"role": "user", "parts": [{"text": "%s"}]},
                    {"role": "user", "parts": [{"text": "%s"}]}
                  ]
                }
                """,
                systemPrompt, userInput
            );

            HttpEntity<String> entity = new HttpEntity<>(requestBody, headers); // Wraps the request body with headers

            // Appends the API Key to the request URL as a query parameter
            String apiUrlWithKey = GEMINI_API_URL + "?key=" + userApiKey;

            // Sends a request to Google Gemini API with the user input
            ResponseEntity<String> response = restTemplate.exchange(
                apiUrlWithKey,
                HttpMethod.POST,
                entity,
                String.class
            );

            // If the response status is 200 OK, return the API response body to the frontend
            if (response.getStatusCode() == HttpStatus.OK) {
                return ResponseEntity.ok(response.getBody());
            } else {
                return ResponseEntity.status(response.getStatusCode()).body("Error from Google API: " + response.getBody());
            }
        } catch (Exception e) {
            // Handles any exceptions and returns an error response
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }
}
