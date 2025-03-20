package com.example.demo.controller;

import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.demo.service.EmailService;;

//  Tutporial used for the framework code https://mailtrap.io/blog/spring-send-email/#How-to-send-emails-from-Spring-Boot-using-Gmail-SMTP

@RestController
@RequestMapping("/email")
public class EmailController {

    @Autowired
    private EmailService mailService;

    @PostMapping("/send")
    public String sendEmail(@RequestParam String to, @RequestParam String subject, @RequestParam String message)
            throws MessagingException {
        mailService.sendEmail(to, subject, message);
        return "Email sent successfully!";
    }
}
