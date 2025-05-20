package com.sarayuth.survey_api.model;

import jakarta.persistence.*;

@Entity
@Table(name = "answers")
public class Answer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Who answered
    @ManyToOne
    @JoinColumn(name = "user_id")
    private SurveyUser user;

    // Which question
    @ManyToOne
    @JoinColumn(name = "question_id")
    private Question question;

    // The selected answer
    @Column(nullable = false)
    private String selectedOption;

    public Answer() {}
    public Answer(SurveyUser user, Question question, String selectedOption) {
        this.user = user;
        this.question = question;
        this.selectedOption = selectedOption;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public SurveyUser getUser() {
        return user;
    }

    public void setUser(SurveyUser user) {
        this.user = user;
    }

    public Question getQuestion() {
        return question;
    }

    public void setQuestion(Question question) {
        this.question = question;
    }

    public String getSelectedOption() {
        return selectedOption;
    }

    public void setSelectedOption(String selectedOption) {
        this.selectedOption = selectedOption;
    }
}
