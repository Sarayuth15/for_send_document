package com.sarayuth.survey_api.model;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "questions")
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Question text
    @Column(nullable = false)
    private String text;

    @ElementCollection
    private List<String> options; // e.g., ["Yes", "No", "Maybe"]

    public Question() {}

    public Question(String text, List<String> options) {
        this.text = text;
        this.options = options;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public List<String> getOptions() {
        return options;
    }

    public void setOptions(List<String> options) {
        this.options = options;
    }
}
