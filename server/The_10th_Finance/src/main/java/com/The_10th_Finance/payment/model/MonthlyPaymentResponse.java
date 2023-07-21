package com.The_10th_Finance.payment.model;

import com.The_10th_Finance.cashpay.db.CashPayment;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class MonthlyPaymentResponse {
    private List<PaymentBankResponse> paymentBankResponses;
    private List<CashPayment> cashPayments;
}
