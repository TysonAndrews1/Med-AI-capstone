package com.example.demo.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.example.demo.entity.EmailRequest;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendEmail(EmailRequest emailRequest) throws MessagingException {
        String to = emailRequest.getTo();
        String subject = emailRequest.getSubject();
        String messageContent = emailRequest.getText();
        // Create a new MimeMessage
        MimeMessage message = mailSender.createMimeMessage();

        // Use MimeMessageHelper to set up the message
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        // Set up the email fields
        helper.setFrom("medihealthai0110@gmail.com");
        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(messageContent, true);

        mailSender.send(message);
    }

}