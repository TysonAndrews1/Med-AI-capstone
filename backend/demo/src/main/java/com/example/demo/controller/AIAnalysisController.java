package com.example.demo.controller;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.apache.http.client.methods.*;
import org.apache.http.impl.client.*;
import org.apache.http.util.EntityUtils;
import org.apache.http.entity.StringEntity;
import org.json.JSONObject;

import java.io.IOException;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class AIAnalysisController {

    private static final String GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

    @Value("${gemini.api.key}")
    private String GEMINI_API_KEY;

    // This method was written with the help of ChatGPT.
    // Prompt: How do I recieve the file from my frontend and send it to the Gemini AI?
    @PostMapping("/analyze")
    public ResponseEntity<String> analyzeFile(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No file uploaded");
        }

        // Testing for correct file and size
        System.out.println("Received file: " + file.getOriginalFilename());
        System.out.println("File size: " + file.getSize() + " bytes");

        try {
            // Extract text from PDF
            String extractedText = extractTextFromPDF(file);

            // Send text to Gemini API
            String geminiResponse = sendToGeminiAPI(extractedText);

            // Return the Gemini API response
            return ResponseEntity.ok(geminiResponse);
        } catch (IOException e) {
            // PDF extraction failed
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Error extracting text from PDF: " + e.getMessage());
        } catch (Exception e) {
            // Generic error
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error processing the file: " + e.getMessage());
        }
    }

    // These methods was written with the help of ChatGPT.
    // Prompt: How do I extract the text information provided by the Gemini AI to be able to display on my frontend?
    // Method to extract text from PDF
    private String extractTextFromPDF(MultipartFile file) throws IOException {
        try (PDDocument document = PDDocument.load(file.getInputStream())) {
            if (document.isEncrypted()) {
                throw new IOException("The PDF file is encrypted and cannot be processed.");
            }
            PDFTextStripper stripper = new PDFTextStripper();
            return stripper.getText(document);
        }
    }

    // Method to send extracted text to Gemini API
    private String sendToGeminiAPI(String extractedText) throws IOException {
        CloseableHttpClient httpClient = HttpClients.createDefault();

        try {
            // Build Gemini API URL with key
            String apiUrl = GEMINI_API_URL + "?key=" + GEMINI_API_KEY;

            // Create HTTP POST request
            HttpPost request = new HttpPost(apiUrl);
            request.setHeader("Content-Type", "application/json");

            // Persona message
            String personaMessage = "You are a helpful and knowledgeable AI called MediHealth AI, that assists users in understanding their medical test results. " +
            "Your goal is to explain the results clearly in non-technical language, provide guidance on possible treatments, " +
            "and recommend reliable websites for further information. If the information is unclear or limited, advise the user to consult a healthcare professional.";

            // Message for Gemini (Persona + extracted data)
            JSONObject content = new JSONObject();
            content.put("contents", new JSONObject()
                    .put("parts", new JSONObject()
                            .put("text", personaMessage + "\n\n" + extractedText)
                    ));

            StringEntity entity = new StringEntity(content.toString());
            request.setEntity(entity);

            // Execute the request
            CloseableHttpResponse response = httpClient.execute(request);

            if (response.getStatusLine().getStatusCode() != 200) {
                throw new RuntimeException("Failed to connect to Gemini API: " + response.getStatusLine().getStatusCode());
            }

            // Extract response as string
            String result = EntityUtils.toString(response.getEntity());
            JSONObject jsonResponse = new JSONObject(result);

            String aiText = jsonResponse
                .getJSONArray("candidates")
                .getJSONObject(0)
                .getJSONObject("content")
                .getJSONArray("parts")
                .getJSONObject(0)
                .getString("text");

            return aiText;  // Only return the text content
        } finally {
            httpClient.close();
        }
    }
}
