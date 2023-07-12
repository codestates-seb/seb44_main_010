package com.The_10th_Finance.user.service;


import com.fasterxml.jackson.databind.JsonNode;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Service
@Slf4j
public class CaptchaService {

    @Value("${google.recaptcha.secret-key}")
    private String secretKey;

    public boolean verify(String token) {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
            MultiValueMap<String,String> map = new LinkedMultiValueMap<>();
            map.add("secret",secretKey);
            map.add("response",token);
            HttpEntity<MultiValueMap<String,String>>request = new HttpEntity<>(map,headers);
            ResponseEntity<JsonNode> response = new RestTemplate().postForEntity(
            "https://www.google.com/recaptcha/api/siteverify",request, JsonNode.class);
            JsonNode responseBody = response.getBody();
            return  responseBody.get("success").asBoolean();
        }catch (Exception e) {
            e.printStackTrace();
            return false;
        }

    }
}
