package com.The_10th_Finance.cashpay.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import java.math.BigDecimal;
import java.time.LocalDateTime;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CashPaymentResponse {

    private Long paymentId;

    //결제 날짜
    private LocalDateTime paymentTime;

    //결제 수단
    private String paymentType;

    //결제 양
    private BigDecimal amount;

    //결제 내용
    private String purpose;

    //카테고리
    private String category;

    private Long propertyId;
}
