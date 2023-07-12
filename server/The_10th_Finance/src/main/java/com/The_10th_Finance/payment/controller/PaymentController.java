package com.The_10th_Finance.payment.controller;

import com.The_10th_Finance.payment.db.Payment;
import com.The_10th_Finance.payment.mapper.PaymentMapper;
import com.The_10th_Finance.payment.model.PaymentPatch;
import com.The_10th_Finance.payment.model.PaymentPost;

import com.The_10th_Finance.payment.service.PaymentService;
import com.The_10th_Finance.payment.service.PaymentSumService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    @PostMapping()
    public ResponseEntity postTodo(@Valid @RequestBody PaymentPost paymentPost){
        Payment payment =paymentService.post(paymentMapper.paymentPostToPayment(paymentPost));
        return  new ResponseEntity(paymentMapper.paymentToPaymentResponse(payment), HttpStatus.CREATED);
    }
    @PostMapping("/sum")
    public ResponseEntity postSum(@Valid @RequestBody PaymentPost paymentPost){
        Payment payment =paymentSumService.post(paymentMapper.paymentPostToPayment(paymentPost));
        return  new ResponseEntity(paymentMapper.paymentToPaymentResponse(payment), HttpStatus.CREATED);
    }
    @GetMapping("/{id}")
    public ResponseEntity getCar(@PathVariable(name = "id") @Positive Long id){
        Payment payment = paymentService.getOne(id);
        return new ResponseEntity(paymentMapper.paymentToPaymentResponse(payment),HttpStatus.ACCEPTED);
    }


    @DeleteMapping("/{id}")
    public void deleteOne(@PathVariable(name = "id") @Positive Long id){
        paymentService.deleteOne(id);
    }

    @PatchMapping("/{id}")
    public ResponseEntity patchTodo(@PathVariable(name = "id") @Positive Long id,
                                    @Valid @RequestBody PaymentPatch paymentPatch) {
        Payment payment = paymentService.getOne(id);
        paymentMapper.paymentPatch(paymentPatch,payment);
        return new ResponseEntity(paymentMapper.paymentToPaymentResponse(paymentService.post(payment)),HttpStatus.ACCEPTED);
    }
}
