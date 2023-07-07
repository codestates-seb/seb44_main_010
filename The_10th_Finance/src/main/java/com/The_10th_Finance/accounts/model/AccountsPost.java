package com.The_10th_Finance.accounts.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Positive;
import javax.validation.constraints.PositiveOrZero;
import java.math.BigDecimal;

@Setter
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class AccountsPost {
    @NotBlank
    private String acoountType;

    //데이터 베이스에선 DECIMAL
    @NotBlank
    @PositiveOrZero
    private BigDecimal balance;

    @NotBlank
    @Positive
    private Long userId;

    @NotBlank
    @Positive
    private Long bankId;

    @NotBlank
    @Pattern(regexp = "^\\d{10,16}$")
    private String accountNum;

    @NotBlank
    @Pattern(regexp = "^\\d{4}-\\d{4}-\\d{4}-\\d{4}$")
    private String cardNum;
}
