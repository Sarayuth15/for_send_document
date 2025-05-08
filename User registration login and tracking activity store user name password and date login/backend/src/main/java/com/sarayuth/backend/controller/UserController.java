package com.sarayuth.backend.controller;

import com.sarayuth.backend.model.LoginHistory;
import com.sarayuth.backend.model.User;
import com.sarayuth.backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class UserController {

    private final UserService service;

    public UserController(UserService service) {
        this.service = service;
    }

    // Get all user endpoint
    @GetMapping("/users")
    public ResponseEntity<String> getAllUsers() {
        String result = service.getAllUsers();
        return ResponseEntity.ok(result);
    }

    // Register endpoint
    @PostMapping("/register")
    public String registerUser(@RequestBody User user) {
        return service.register(user);
    }

    // Login endpoint
    @PostMapping("/login")
    public String loginUser(@RequestBody Map<String, String> credentials) {
        String username = credentials.get("username");
        String password = credentials.get("password");

        return service.login(username, password);
    }
}
