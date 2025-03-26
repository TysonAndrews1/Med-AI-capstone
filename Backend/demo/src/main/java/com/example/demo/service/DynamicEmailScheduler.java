package com.example.demo.service;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.concurrent.ScheduledFuture;

@Service
@EnableScheduling
public class DynamicEmailScheduler {
    private final TaskScheduler taskScheduler;
    private final JavaMailSender mailSender;
    private ScheduledFuture<?> scheduledTask;

    public DynamicEmailScheduler(TaskScheduler taskScheduler, JavaMailSender mailSender) {
        this.taskScheduler = taskScheduler;
        this.mailSender = mailSender;
    }

    public void scheduleEmail(LocalDateTime sendTime) {
        if (scheduledTask != null) {
            scheduledTask.cancel(false); // Cancel the previous task if it exists
        }

        scheduledTask = taskScheduler.schedule(this::sendEmail,
                sendTime.atZone(ZoneId.systemDefault()).toInstant());

        System.out.println("Email scheduled for: " + sendTime);
    }

    private void sendEmail() {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo("recipient@example.com");
            helper.setSubject("Scheduled Email");
            helper.setText("This is your dynamically scheduled email!", true);

            mailSender.send(message);
            System.out.println("Email sent successfully!");
        } catch (MessagingException e) {
            System.err.println("Failed to send email: " + e.getMessage());
        }
    }
}
