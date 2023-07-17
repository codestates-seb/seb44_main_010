package com.The_10th_Finance.payment.controller;

import com.The_10th_Finance.payment.db.Payment;
import com.The_10th_Finance.payment.mapper.PaymentMapper;
import com.The_10th_Finance.payment.model.PaymentPatch;
import com.The_10th_Finance.payment.model.PaymentPost;

import com.The_10th_Finance.payment.service.PaymentService;
import com.The_10th_Finance.domain.paymenttransaction.PaymentSumService;
import com.The_10th_Finance.response.Response;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@Slf4j
@RestController
@RequestMapping("/payment")
@RequiredArgsConstructor
public class PaymentController {
    private final PaymentSumService paymentSumService;
    private final PaymentService paymentService;
    private final PaymentMapper paymentMapper;
    @CacheEvict(value = "monthlySumCache", key = "'customKey'")
    @PostMapping()
    public Response.SuccessResponse postTodo(@Valid @RequestBody PaymentPost paymentPost){
        Payment payment =paymentService.post(paymentMapper.paymentPostToPayment(paymentPost));
        return  new Response.SuccessResponse<>(paymentMapper.paymentToPaymentResponse(payment), HttpStatus.CREATED);
    }



    @PostMapping("/sum")
    public Response.SuccessResponse postSum(@Valid @RequestBody PaymentPost paymentPost){
        Payment payment =paymentSumService.post(paymentMapper.paymentPostToPayment(paymentPost));
        return  new Response.SuccessResponse<>(paymentMapper.paymentToPaymentResponse(payment), HttpStatus.CREATED);
    }
    @GetMapping("/{id}")
    public Response.SuccessResponse getCar(@PathVariable(name = "id") @Positive Long id){
        Payment payment = paymentService.getOne(id);
        return new Response.SuccessResponse<>(paymentMapper.paymentToPaymentResponse(payment),HttpStatus.ACCEPTED);
    }


    @DeleteMapping("/{id}")
    public void deleteOne(@PathVariable(name = "id") @Positive Long id){
        paymentService.deleteOne(id);
    }

    @PatchMapping("/{id}")
    public Response.SuccessResponse patchTodo(@PathVariable(name = "id") @Positive Long id,
                                    @Valid @RequestBody PaymentPatch paymentPatch) {
        Payment payment = paymentService.getOne(id);
        paymentMapper.paymentPatch(paymentPatch,payment);
        return new Response.SuccessResponse<>(paymentMapper.paymentToPaymentResponse(paymentService.post(payment)),HttpStatus.ACCEPTED);
    }
}
