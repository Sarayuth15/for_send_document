package com.sarayuth.survey_api;

import com.sarayuth.survey_api.model.Question;
import com.sarayuth.survey_api.repository.QuestionRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;

@Configuration
public class DataInitializer {

    // using: CommandLineRunner to insert dummy questions at startup
    @Bean
    CommandLineRunner initQuestions(QuestionRepository questionRepo) {
        return args -> {
            if(questionRepo.count() == 0) {
                // Sample questions
                new Question("How satisfied are you with our product?", Arrays.asList("Very Satisfied", "Neutral", "Dissatisfied"));
                new Question("How likely are you to recommend us to a friend?", Arrays.asList("Very Likely", "Maybe", "Not at all"));
            }
        };
    }
}
