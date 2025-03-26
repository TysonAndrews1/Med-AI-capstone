package com.example.demo.entity;

import lombok.*;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EmailRequest {

    private long id;

    private String to;
    private String subject;
    private String text;

    public List<String> times;
}
