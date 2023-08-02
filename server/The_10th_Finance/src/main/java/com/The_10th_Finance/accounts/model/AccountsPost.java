package com.The_10th_Finance.accounts.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.*;
import java.math.BigDecimal;

@Setter
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class AccountsPost {


    @NotBlank
    private String acoountType;

    //데이터 베이스에선 DECIMAL
    @NotNull
    @PositiveOrZero
    private BigDecimal balance;

    @NotNull
    @Positive
    private Long userId;

    @NotNull
    @Positive
    private Long bankId;

    @NotBlank
    @Pattern(regexp = "^\\d{10,16}$")
    private String accountNum;

    @NotBlank
    @Pattern(regexp = "^\\d{4}-\\d{4}-\\d{4}-\\d{4}$")
    private String cardNum;
}
