package com.sarayuth.survey_api.repository;

import com.sarayuth.survey_api.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionRepository extends JpaRepository<Question, Long> {
}
