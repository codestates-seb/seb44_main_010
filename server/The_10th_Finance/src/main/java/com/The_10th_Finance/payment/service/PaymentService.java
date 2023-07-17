package com.The_10th_Finance.payment.service;

import com.The_10th_Finance.error.BusinessLogicException;
import com.The_10th_Finance.error.ExceptionCode;
import com.The_10th_Finance.payment.db.Payment;
import com.The_10th_Finance.payment.db.PaymentRepository;
import com.The_10th_Finance.payment.mapper.PaymentMapper;
import com.The_10th_Finance.payment.model.PaymentResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final PaymentMapper paymentMapper;

    @Transactional
    public Payment post(Payment paymentPostToPayment) {
        Payment payment =paymentRepository.save(paymentPostToPayment);
        return payment;
    }

    public Payment getOne(Long id) {
        return paymentRepository.findById(id).orElseThrow(() -> new BusinessLogicException(ExceptionCode.NOSUCHFOUND));
    }

    @Transactional
    public void deleteOne(Long id) {
        paymentRepository.deleteById(id);
    }

    public Payment getMypayMent(Long id) {
        return paymentRepository.findById(id).orElseThrow(() -> new BusinessLogicException(ExceptionCode.NOSUCHFOUND));
    }

    public List<PaymentResponse> getAllpayment(List<Long> accountId, int month) {
       List<Payment> payment = paymentRepository.findPaymentByAccountIdInAndMonth(accountId, month).orElseThrow(() -> new BusinessLogicException(ExceptionCode.NOSUCHFOUND));
        return paymentMapper.paymentListToPaymentResponseList(payment);
    }

    public List<PaymentResponse> getONepayment(List<Long> accountId, int month, int day) {
        List<Payment> payment = paymentRepository.findPaymentByAccountIdInAndMonthAndDate(accountId, month,day).orElseThrow(() -> new BusinessLogicException(ExceptionCode.NOSUCHFOUND));
        return paymentMapper.paymentListToPaymentResponseList(payment);
    }
}