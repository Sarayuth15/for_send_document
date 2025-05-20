package com.sarayuth.survey_api.dto;

import java.util.Map;

public class SurveySubmissionDTO {
    private String name;
    private String email;
    private Map<Long, String> answers; // questionId -> selectedOption

    public SurveySubmissionDTO() {}

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Map<Long, String> getAnswers() {
        return answers;
    }

    public void setAnswers(Map<Long, String> answers) {
        this.answers = answers;
    }
}
