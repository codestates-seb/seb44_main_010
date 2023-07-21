package com.The_10th_Finance.accounts.db;


import com.The_10th_Finance.audit.Audit;
import com.The_10th_Finance.bank.db.Bank;
import com.The_10th_Finance.payment.db.Payment;
import com.The_10th_Finance.user.db.User;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@Entity(name = "property_account")
@Table(name = "property_account")
public class Accounts extends Audit  {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, unique = true)
    private Long accountId;

    @Column(name = "account_type", nullable = false)
    private String acoountType;

    //데이터 베이스에선 DECIMAL
    @Column(name = "balance", nullable = false)
    private BigDecimal balance;

    @Enumerated(EnumType.STRING)
    @Column(name = "account_statement", nullable = false)
    private AccountStatement accountStatement;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "bank_id", nullable = false)
    private Long bankId;

    @Column(name = "account_number", nullable = false, unique = true)
    private String accountNum;

    @Column(name = "card_number", nullable = false, unique = true)
    private String cardNum;

    public enum AccountStatement{

        ACTIVE("활성됨"),
        NOACTIVE("비활성"),
        BLOCKED("휴먼계정");
        @Getter
        private String states;

        AccountStatement(String states) {
            this.states = states;
        }
    }

}
