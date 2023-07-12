package com.The_10th_Finance.payment.service;

import com.The_10th_Finance.error.BusinessLogicException;
import com.The_10th_Finance.error.ExceptionCode;
import com.The_10th_Finance.payment.db.Payment;
import com.The_10th_Finance.payment.db.PaymentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Slf4j
@RequiredArgsConstructor
public class PaymentService {

    private final PaymentRepository paymentRepository;


    @Transactional
    public Payment post(Payment paymentPostToPayment) {
        Payment payment =paymentRepository.save(paymentPostToPayment);
        return payment;
    }

    public Payment getOne(Long id) {
        return paymentRepository.findById(id).orElseThrow(() -> new BusinessLogicException(ExceptionCode.USERNOTFOUND));
    }

    public void deleteOne(Long id) {
        paymentRepository.deleteById(id);
    }

    public Payment getMypayMent(Long id) {
        return paymentRepository.findById(id).orElseThrow(() -> new BusinessLogicException(ExceptionCode.USERNOTFOUND));
    }
}