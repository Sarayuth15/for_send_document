package com.sarayuth.generateJWTSecret.controller;

import com.sarayuth.generateJWTSecret.util.JwtUtil;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class JwtController {

    private final JwtUtil jwtUtil;

    public JwtController(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    // http://localhost:8080/swagger-ui/index.html#
    @GetMapping("/generate-jwt-secret")
    public String generateJwtSecret() {
        return jwtUtil.generateJwtSecret();
    }
}
