package com.The_10th_Finance.domain.getdailysum;

import com.The_10th_Finance.cashpay.db.CashPayment;
import com.The_10th_Finance.domain.getdailysum.DaySummary;
import com.The_10th_Finance.payment.model.PaymentBankResponse;
import com.The_10th_Finance.payment.model.PaymentResponse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DailyPaymentResponse {
    private List<PaymentBankResponse> paymentResponses;
    private  List<CashPayment> cashPayments;
    private DaySummary daySummary;

}
