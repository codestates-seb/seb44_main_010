package com.The_10th_Finance.payment.model;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PaymentResponse {
    private Long paymentId;

    private LocalDateTime paymentTime;

    private String paymentType;

    private String counterPartyName;

    private BigDecimal amount;

    private String purpose;

    private String category;

    private Long accountId;

}
