package com.sarayuth.survey_api.repository;

import com.sarayuth.survey_api.model.SurveyUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SurveyUserRepository extends JpaRepository<SurveyUser, Long> {
}
