package com.The_10th_Finance.cashpay.model;

import lombok.Getter;

import javax.persistence.Column;
import java.math.BigDecimal;
import java.time.LocalDateTime;


@Getter
public class CashPaymentPost {

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
