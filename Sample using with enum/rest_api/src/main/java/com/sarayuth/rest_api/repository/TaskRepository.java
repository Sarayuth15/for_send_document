package com.sarayuth.rest_api.repository;

import com.sarayuth.rest_api.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {
}
