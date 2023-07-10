package com.The_10th_Finance.jwt;


import com.The_10th_Finance.user.db.User;
import com.The_10th_Finance.user.service.UserService;
import com.The_10th_Finance.user.service.UsersDetailService;
import com.The_10th_Finance.user.usermapper.UserMapper;
import com.sun.security.auth.UserPrincipal;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/mypage")
@RequiredArgsConstructor
public class jwtController {

    private final UserService userService;
    private final UserMapper userMapper;

    @GetMapping("")
    public ResponseEntity getPrinciple(@AuthenticationPrincipal UsersDetailService.UserAthentication userPrincipal){
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        log.info("{}",principal);
        User user = userService.findByEmail((String) principal);
        return new ResponseEntity(userMapper.userToUserResponseDto(user),HttpStatus.ACCEPTED);
    }



}
