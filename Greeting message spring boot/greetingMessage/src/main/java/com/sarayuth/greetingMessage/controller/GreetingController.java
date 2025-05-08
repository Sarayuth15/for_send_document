package com.sarayuth.greetingMessage.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.time.LocalTime;

@Controller
public class GreetingController {

    @GetMapping("/")
    public String showGreeting(Model model) {
        LocalTime time = LocalTime.now();
        String message = "";
        int hour = time.getHour();
        if (hour >= 5 && hour < 12) {
            message = "Good morning, EK Sarayuth. 🌻";
        } else if (hour >= 12 && hour < 18) {
            message = "Have a good afternoon, EK Sarayuth. 💵";
        } else {
            message = "Good Evening, EK Sarayuth. 🌛";
        }
        model.addAttribute("greeting", message);
        return "index";
    }
}
