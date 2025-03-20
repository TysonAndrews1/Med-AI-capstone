package com.example.demo.service;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class ScheduledEmailService {
    private final JavaMailSender mailSender;

    public ScheduledEmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    @Scheduled(cron = "0 0 9 * * ?") // Runs every day at 9 AM
    public void sendRecurringEmail() {
        try {
            sendEmail("recipient@example.com", "Daily Reminder", "This is your scheduled email!");
            System.out.println("Scheduled email sent successfully!");
        } catch (Exception e) {
            System.err.println("Failed to send scheduled email: " + e.getMessage());
        }
    }

    private void sendEmail(String to, String subject, String text) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(text, true); // true = send as HTML

        mailSender.send(message);
    }
}
