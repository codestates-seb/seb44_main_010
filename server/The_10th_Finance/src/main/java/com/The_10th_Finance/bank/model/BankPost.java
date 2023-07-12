package com.The_10th_Finance.bank.model;

import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Getter
public class BankPost {

    @NotBlank
    @Pattern(regexp = "^[가-힣]+$")
    private String bankName;

    private String bankLocation;

    private String bankNumber;

}
