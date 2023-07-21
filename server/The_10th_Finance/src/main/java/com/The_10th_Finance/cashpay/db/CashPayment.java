package com.The_10th_Finance.cashpay.db;

import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@Entity(name = "cash_payment")
@Table(name = "cash_payment")
public class CashPayment implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "payment_id", nullable = false, unique = true)
    private Long paymentId;

    @Column(name = "payment_time", nullable = false)
    //결제 날짜
    private LocalDateTime paymentTime;

    @Column(name = "payment_type", nullable = false)
    //결제 수단
    private String paymentType;

    @Column(name = "amount", nullable = false)
    //결제 양
    private BigDecimal amount;

    @Column(name = "purpose", nullable = false)
    //결제 내용
    private String purpose;

    @Column(name = "category", nullable = false)
    //카테고리
    private String category;


    @Column(name = "property_id", nullable = false)
    private Long propertyId;

}
