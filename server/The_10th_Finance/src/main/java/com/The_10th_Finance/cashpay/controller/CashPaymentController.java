package com.The_10th_Finance.cashpay.controller;

import com.The_10th_Finance.cashpay.db.CashPayment;
import com.The_10th_Finance.cashpay.mapper.CashPaymentMapper;
import com.The_10th_Finance.cashpay.model.CashPaymentPost;
import com.The_10th_Finance.cashpay.service.CashPaymentService;
import com.The_10th_Finance.response.Response;
import com.google.api.Http;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/cashPayment")
@RequiredArgsConstructor
public class CashPaymentController {
    private final CashPaymentService cashPaymentService;
    private final CashPaymentMapper cashPaymentMapper;

    @PostMapping("post")
 public Response.SuccessResponse CashPost(@RequestBody CashPaymentPost cashPaymentPost){
        CashPayment cashPayment = cashPaymentService.post(cashPaymentMapper.cashPaymentPostToCasyPayment(cashPaymentPost));
        return new Response.SuccessResponse(cashPaymentMapper.cashPaymentToCashPaymentRespone(cashPayment),HttpStatus.CREATED);
 }
}
