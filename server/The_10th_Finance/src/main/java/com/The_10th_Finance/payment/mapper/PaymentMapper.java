package com.The_10th_Finance.payment.mapper;

import com.The_10th_Finance.payment.db.Payment;
import com.The_10th_Finance.payment.model.PaymentPatch;
import com.The_10th_Finance.payment.model.PaymentPost;
import com.The_10th_Finance.payment.model.PaymentResponse;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface PaymentMapper {
    Payment paymentPostToPayment(PaymentPost paymentPost);
    PaymentResponse paymentToPaymentResponse(Payment payment);
    void paymentPatch(PaymentPatch paymentPatch, @MappingTarget Payment payment);
}
