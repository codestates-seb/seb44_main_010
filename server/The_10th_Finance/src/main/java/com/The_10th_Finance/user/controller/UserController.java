package com.The_10th_Finance.user.controller;


import com.The_10th_Finance.user.db.User;
import com.The_10th_Finance.user.model.UserPostDto;
import com.The_10th_Finance.user.service.CaptchaService;
import com.The_10th_Finance.user.service.CaptchaService;
import com.The_10th_Finance.user.service.UserService;
import com.The_10th_Finance.user.usermapper.UserMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;
import java.util.NoSuchElementException;
import java.util.Optional;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class UserController {
    private final CaptchaService captchaService;
    private final UserService userService;
    private final UserMapper userMapper;

    @PostMapping("/captcha")
    public ResponseEntity verifyCaptcha(@RequestParam("token") String token){
        if(captchaService.verify(token)){
            return ResponseEntity.ok("success");
        }else{
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("faild");
        }
    }

    @PostMapping("/sign-up")
    public ResponseEntity postUser(@Valid @RequestBody UserPostDto userPostDto){

        User user=userService.save(userMapper.userPostDtoToUser(userPostDto));
        return new ResponseEntity(userMapper.userToUserResponseDto(user),HttpStatus.CREATED);
    }


    @GetMapping("/{email}")
    public  ResponseEntity getUser(@PathVariable(name = "email") String email){
        User user = userService.findByEmail(email);
        return new ResponseEntity(userMapper.userToUserResponseDto(user),HttpStatus.ACCEPTED);
    }

    @GetMapping("/mypage")
    public ResponseEntity getUserInfo(){
        String email = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user =userService.findByEmail(email);
        return new ResponseEntity(userMapper.userToUserResponseDto(user),HttpStatus.ACCEPTED);
    }

//    @GetMapping("/RefreshToken")
//    public ResponseEntity reNewToken(@RequestHeader("Authorization") String RefreshToken, HttpServletResponse response){
//        String accessToken = userService.getAccessToken(RefreshToken);
//
//        response.setHeader("Authorization", "Bearer " + accessToken);
//        return new ResponseEntity(HttpStatus.ACCEPTED);
//    }


}
