package com.The_10th_Finance.payment.model;

import lombok.*;

import javax.validation.constraints.Pattern;
import javax.validation.constraints.Positive;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PaymentPatch {
    private LocalDateTime paymentTime;

    @Pattern(regexp = "입금|출금")
    private String paymentType;

    private String counterPartyName;


    private BigDecimal amount;

    private String purpose;

    private String category;
}
