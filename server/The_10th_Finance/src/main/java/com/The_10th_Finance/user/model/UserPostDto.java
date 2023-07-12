package com.The_10th_Finance.user.model;

import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.Email;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.util.List;

@AllArgsConstructor
@Getter
public class UserPostDto {
    //Validation 적용
    @Size(min = 1, max = 16)
    @Pattern(regexp = "^[a-zA-Z가-힣]*$", message = "Only alphabets and Korean characters are allowed")
    private String name;

    @Email
    private String email;

    @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,}$",   message = "Password must be at least 8 characters long and contain at least one digit, one upper case letter, one lower case letter, and one special character")
    private String password;


}