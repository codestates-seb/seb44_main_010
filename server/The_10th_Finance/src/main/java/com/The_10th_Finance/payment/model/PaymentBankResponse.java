package com.The_10th_Finance.payment.model;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class PaymentBankResponse {
    private PaymentResponse paymentResponse;
    private String bankName;
}
