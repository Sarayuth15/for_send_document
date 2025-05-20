package com.sarayuth.survey_api.dto;

import java.util.Map;

public class UserSurveyResultDTO {

    private String name;
    private String email;
    private Map<String, String> questionAnswers; // QuestionText -> SelectedOption

    public UserSurveyResultDTO() {}

    public UserSurveyResultDTO(String name, String email, Map<String, String> questionAnswers) {
        this.name = name;
        this.email = email;
        this.questionAnswers = questionAnswers;
    }

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

    public Map<String, String> getQuestionAnswers() {
        return questionAnswers;
    }

    public void setQuestionAnswers(Map<String, String> questionAnswers) {
        this.questionAnswers = questionAnswers;
    }
}
