package com.The_10th_Finance.gpt.controller;

import com.The_10th_Finance.gpt.model.ChatGptResponseDto;
import io.github.flashvayne.chatgpt.service.ChatgptService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@Slf4j
@RequestMapping("/api/v1/chat-gpt")
public class testController {

    private final ChatGptService chatGptService;


    @PostMapping("/question")
    public ChatGptResponseDto sendQuestion(@RequestBody QuestionRequestDto requestDto) {
        return chatGptService.askQuestion(requestDto);
    }
}