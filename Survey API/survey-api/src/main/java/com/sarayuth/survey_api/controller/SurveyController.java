package com.sarayuth.survey_api.controller;

import com.sarayuth.survey_api.dto.SurveySubmissionDTO;
import com.sarayuth.survey_api.dto.UserSurveyResultDTO;
import com.sarayuth.survey_api.model.Answer;
import com.sarayuth.survey_api.model.Question;
import com.sarayuth.survey_api.model.SurveyUser;
import com.sarayuth.survey_api.repository.AnswerRepository;
import com.sarayuth.survey_api.repository.QuestionRepository;
import com.sarayuth.survey_api.repository.SurveyUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/survey")
public class SurveyController {

    @Autowired
    private SurveyUserRepository userRepo;

    @Autowired
    private QuestionRepository questionRepo;

    @Autowired
    private AnswerRepository answerRepo;

    // Submit survey endpoint
    @PostMapping("/submit")
    public String submitSurvey(@RequestBody SurveySubmissionDTO dto) {
        // Create new user
        SurveyUser user = new SurveyUser(dto.getName(), dto.getEmail());
        userRepo.save(user);

        // Save answers
        for (Map.Entry<Long, String> entry : dto.getAnswers().entrySet()) {
            Long questionId = entry.getKey();
            String selectedOption = entry.getValue();

            Optional<Question> questionOpt = questionRepo.findById(questionId);
            if (questionOpt.isPresent()) {
                Answer answer = new Answer(user, questionOpt.get(), selectedOption);
                answerRepo.save(answer);
            }
        }
        return "Survey submitted successfully.";
    }

    // Load questions (for frontend)
    @GetMapping("/questions")
    public List<Question> getQuestions() {
        return questionRepo.findAll();
    }

    // Get all user that have survey
    @GetMapping("/responses")
    public List<UserSurveyResultDTO> listSurveyResponses() {

        List<SurveyUser> users = userRepo.findAll();
        List<Answer> allAnswers = answerRepo.findAll();

        List<UserSurveyResultDTO> results = new ArrayList<>();

        for(SurveyUser user: users) {
            Map<String, String> answersMap = new LinkedHashMap<>();

            // Find answers for this user
            for(Answer answer : allAnswers) {
                if (answer.getUser().getId().equals(user.getId())) {
                    String questionText = answer.getQuestion().getText();
                    String selectedOption = answer.getSelectedOption();
                    answersMap.put(questionText, selectedOption);
                }
            }
            UserSurveyResultDTO dto = new UserSurveyResultDTO(user.getName(), user.getEmail(), answersMap);
            results.add(dto);

        }
        return results;
    }

    // Count
    @GetMapping("/responses/count/user")
    public Map<String, Long> countSurveyResponses() {
        long count = userRepo.count();  // .count() is build-in JPA method to count total rows
        // Return as JSON: { "count": 5 }
        Map<String, Long> response = new HashMap<>();
        response.put("count", count);
        return response;
    }

    @GetMapping("/responses/count/question")
    public Map<String, Long> countSurveyQuestion() {
        long count = questionRepo.count();
        Map<String, Long> response = new HashMap<>();
        response.put("Total quest: ", count);
        return response;
    }
}
