package com.example.demo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import java.util.Properties;

@Configuration
public class MailConfig {

    @Bean
    public JavaMailSender getJavaMailSender() {
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();

        // Set the SMTP host and port for Gmail
        mailSender.setHost("smtp.gmail.com");
        mailSender.setPort(587);

        // Use the Gmail email account credentials
        mailSender.setUsername("medihealthai0110@gmail.com");
        mailSender.setPassword("brxszmtdyahlkwvm"); // Replace with your app password

        // Set email properties required for Gmail
        Properties props = mailSender.getJavaMailProperties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.timeout", "10000"); // Increase the connection timeout (in ms)
        props.put("mail.smtp.connectiontimeout", "10000"); // Increase connection timeout
        props.put("mail.smtp.writetimeout", "10000"); // Increase write timeout

        return mailSender;
    }
}
