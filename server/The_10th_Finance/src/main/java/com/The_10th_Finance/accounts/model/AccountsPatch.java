package com.The_10th_Finance.accounts.model;

import com.The_10th_Finance.accounts.db.Accounts;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.PositiveOrZero;
import java.math.BigDecimal;



public class AccountsPatch {
    @NotBlank
    private String acoountType;

    //데이터 베이스에선 DECIMAL
    @NotBlank
    @PositiveOrZero
    private BigDecimal balance;

    private Accounts.AccountStatement accountStatement;

    @NotBlank
    @Pattern(regexp = "^\\d{10,16}$")
    private String accountNum;

    @NotBlank
    @Pattern(regexp = "^\\d{4}-\\d{4}-\\d{4}-\\d{4}$")
    private String cardNum;
}
