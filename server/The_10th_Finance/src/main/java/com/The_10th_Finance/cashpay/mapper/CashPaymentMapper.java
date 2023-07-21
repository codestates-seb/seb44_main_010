package com.The_10th_Finance.cashpay.mapper;

import com.The_10th_Finance.cashpay.db.CashPayment;
import com.The_10th_Finance.cashpay.model.CashPaymentPost;
import com.The_10th_Finance.cashpay.model.CashPaymentResponse;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CashPaymentMapper {
    CashPayment cashPaymentPostToCasyPayment(CashPaymentPost cashPaymentPost);
    CashPaymentResponse cashPaymentToCashPaymentRespone(CashPayment cashPayment);
}
