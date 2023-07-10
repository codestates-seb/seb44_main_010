package com.The_10th_Finance.payment.model;

import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.Pattern;
import javax.validation.constraints.Positive;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class PaymentPost {

    private LocalDateTime paymentTime;


    @Pattern(regexp = "입금|출금")
    private String paymentType;

    private String counterPartyName;


    private BigDecimal amount;

    private String purpose;

    private String category;

    @Positive
    private Long accountId;
}
