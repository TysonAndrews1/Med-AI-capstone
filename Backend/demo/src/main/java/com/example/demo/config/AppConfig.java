package com.example.demo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.client.SimpleClientHttpRequestFactory;

import javax.net.ssl.*;
import java.security.cert.X509Certificate;

@Configuration
public class AppConfig {

    @Bean
    public RestTemplate restTemplate() throws Exception {
        // Trust all SSL certificates (for development only)
        TrustManager[] trustAllCertificates = new TrustManager[] {
                new X509TrustManager() {
                    public void checkClientTrusted(X509Certificate[] chain, String authType) {
                    }

                    public void checkServerTrusted(X509Certificate[] chain, String authType) {
                    }

                    public X509Certificate[] getAcceptedIssuers() {
                        return new X509Certificate[0];
                    }
                }
        };

        SSLContext sslContext = SSLContext.getInstance("TLS");
        sslContext.init(null, trustAllCertificates, new java.security.SecureRandom());

        HttpsURLConnection.setDefaultSSLSocketFactory(sslContext.getSocketFactory());

        // Use default RestTemplate factory (no Apache HttpClient needed)
        SimpleClientHttpRequestFactory factory = new SimpleClientHttpRequestFactory();
        return new RestTemplate(factory);
    }
}
