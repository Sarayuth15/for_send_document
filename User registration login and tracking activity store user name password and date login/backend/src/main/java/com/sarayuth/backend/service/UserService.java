package com.sarayuth.backend.service;

import com.sarayuth.backend.model.LoginHistory;
import com.sarayuth.backend.model.User;
import com.sarayuth.backend.repository.LoginHistoryRepository;
import com.sarayuth.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepo;
    private final LoginHistoryRepository loginRepo;

    public UserService(UserRepository userRepository, LoginHistoryRepository loginHistoryRepository) {
        this.userRepo = userRepository;
        this.loginRepo = loginHistoryRepository;
    }

    // Find all user
    public String getAllUsers() {
        List<User> users = userRepo.findAll();
        if (users == null || users.isEmpty()) {
            return "No users found.";
        }
        return users.toString();
    }

    // Register a new user
    public String register(User user) {
        // Case user is already exists
        if (userRepo.findByUsername(user.getUsername()) != null) {
            return "Username already exists!";
        }
        userRepo.save(user);
        return "User registered successfully";
    }

    // Login and record login date
    public String login(String username, String password) {
        User user = userRepo.findByUsername(username);
        if (user != null && user.getPassword().equals(password)) {
            // Save login history
            LoginHistory loginHistory = new LoginHistory();
            loginHistory.setUsername(username);
            loginHistory.setLoginDate(LocalDate.now());
            loginRepo.save(loginHistory);

            return "Login successful!";
        } else {
            return "Invalid credentials.";
        }
    }
}
