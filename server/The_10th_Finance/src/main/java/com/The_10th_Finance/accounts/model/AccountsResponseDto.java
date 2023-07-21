package com.The_10th_Finance.accounts.model;

import com.The_10th_Finance.accounts.db.Accounts;
import lombok.*;

import java.io.Serializable;
import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AccountsResponseDto implements Serializable {
    private Long accountId;

    private String acoountType;
    //데이터 베이스에선 DECIMAL
    private BigDecimal balance;

    private Accounts.AccountStatement accountStatement;

    private Long userId;

    private Long bankId;

    private String accountNum;

    private String cardNum;

}
