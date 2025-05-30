package com.sarayuth.rest_api.controller;

import com.sarayuth.rest_api.model.Task;
import com.sarayuth.rest_api.repository.TaskRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/tasks")
public class TaskController {

    private final TaskRepository repository;

    public TaskController(TaskRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public String hello() {
        return "Hello";
    }
    @GetMapping("/get")
    public List<Task> getAllTasks() {
        return repository.findAll();
    }

    @PostMapping("/create")
    public Task createTask(@RequestBody Task task) {
        return repository.save(task);
    }
}
