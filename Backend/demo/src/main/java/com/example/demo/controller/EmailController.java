package com.example.demo.controller;

import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.demo.service.EmailService;
import com.example.demo.entity.EmailRequest;
//  Tutporial used for the framework code https://mailtrap.io/blog/spring-send-email/#How-to-send-emails-from-Spring-Boot-using-Gmail-SMTP

@RestController
@RequestMapping("/email")
public class EmailController {

    @Autowired
    private EmailService emailService;

    @PostMapping("/send")
    public String sendEmail(@RequestBody EmailRequest emailRequest) throws MessagingException {
        System.out.println("Received email request: " + emailRequest);
        emailService.sendEmail(emailRequest);
        return "Email sent successfully!";
    }
}
