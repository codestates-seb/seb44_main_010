package com.The_10th_Finance.jwt;

import com.The_10th_Finance.auth.LoginDto;
import com.The_10th_Finance.handler.MemberAuthenticationSuccessHandler;
import com.The_10th_Finance.user.db.User;
import lombok.extern.slf4j.Slf4j;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.exc.MismatchedInputException;

import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.nio.charset.StandardCharsets;
import java.util.*;

@Slf4j
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {  // (1)
    private final AuthenticationManager authenticationManager;
    private final JwtTokenizer jwtTokenizer;

    // (2)
    public JwtAuthenticationFilter(AuthenticationManager authenticationManager, JwtTokenizer jwtTokenizer) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenizer = jwtTokenizer;
    }
    @SneakyThrows
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) {
        log.info("Request URI: {}", request.getRequestURI());
        log.info("Request URL: {}", request.getRequestURL().toString());
        ObjectMapper objectMapper = new ObjectMapper();
        LoginDto loginDto = objectMapper.readValue(request.getInputStream(), LoginDto.class);
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(loginDto.getUserName(), loginDto.getPassword());

        return authenticationManager.authenticate(authenticationToken);
    }


    // (4)
    @Override
    protected void successfulAuthentication(HttpServletRequest request,
                                            HttpServletResponse response,
                                            FilterChain chain,
                                            Authentication authResult) throws IOException, ServletException {

        User user = (User) authResult.getPrincipal();  // (4-1)
        String accessToken =jwtTokenizer.delegateAccessToken(user);   // (4-2)
        log.info("successfulAutentication{}",accessToken);
        String refreshToken = jwtTokenizer.delegateRefreshToken(user); // (4-3)

        response.setHeader("Access-Control-Expose-Headers", "Authorization, Refresh");
        response.setHeader("Authorization", "Bearer " + accessToken);  // (4-4)
        response.setHeader("Refresh", refreshToken);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        String json = String.format("{\"username\":\"%s\", \"userId\":\"%s\"}", user.getName(), user.getId());
        out.print(json);
        out.flush();
        this.getSuccessHandler().onAuthenticationSuccess(request, response, authResult);
    }





}