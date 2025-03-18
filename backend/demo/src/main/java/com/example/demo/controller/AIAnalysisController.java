package com.example.demo.controller;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = "*")
public class AIAnalysisController {

    @PostMapping("/analyze")
    public ResponseEntity<String> analyzeFile(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No file uploaded");
        }
    
        // Log file name and size
        System.out.println("Received file: " + file.getOriginalFilename());
        System.out.println("File size: " + file.getSize() + " bytes");
    
        try {
            // Extract text from PDF
            String extractedText = extractTextFromPDF(file);
            return ResponseEntity.ok("Extracted text: " + extractedText);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error processing the file: " + e.getMessage());
        }
    }    

    // Method to extract text from the uploaded PDF file
    private String extractTextFromPDF(MultipartFile file) throws IOException {
        try (PDDocument document = PDDocument.load(file.getInputStream())) {
            PDFTextStripper stripper = new PDFTextStripper();
            return stripper.getText(document); // Extracts the text from the document
        }
    }
}
