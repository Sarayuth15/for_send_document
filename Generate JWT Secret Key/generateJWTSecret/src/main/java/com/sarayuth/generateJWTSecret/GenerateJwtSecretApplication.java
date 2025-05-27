package com.sarayuth.generateJWTSecret;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@OpenAPIDefinition(
		info = @Info(
				title = "Generate JWT Secret",
				version = "1.0.0",
				description = "Easy to use",
				contact = @Contact(
						name = "Generate JWT Secret",
						email = "rayuthek430@gmail.com"
				)
		)
)
@SpringBootApplication
public class GenerateJwtSecretApplication {

	public static void main(String[] args) {
		SpringApplication.run(GenerateJwtSecretApplication.class, args);
	}

}
