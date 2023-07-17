package com.The_10th_Finance.oauth2;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping()
public class Oauth2Controller {

    @GetMapping("/login/error")
    public String login(@PathVariable(name = "error")String error) {
        return error;
    }

    @GetMapping("/{access_token}/{refresh_token}")
    public ResponseEntity<String> login(@PathVariable(name = "access_token") String token1, @PathVariable(name = "refresh_token") String token2) {
        String result = "Access Token: " + token1 + "\n" + "Refresh Token: " + token2;
        return ResponseEntity.ok(result);
    }
}
