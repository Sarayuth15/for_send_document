package com.sarayuth.survey_api.repository;

import com.sarayuth.survey_api.model.Answer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnswerRepository extends JpaRepository<Answer, Long> {
}
