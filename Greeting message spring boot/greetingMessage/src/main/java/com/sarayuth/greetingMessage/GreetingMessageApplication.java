package com.sarayuth.greetingMessage;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.time.LocalDateTime;
import java.time.LocalTime;

@SpringBootApplication
public class GreetingMessageApplication {

	public static void main(String[] args) {
		SpringApplication.run(GreetingMessageApplication.class, args);
	}

}
