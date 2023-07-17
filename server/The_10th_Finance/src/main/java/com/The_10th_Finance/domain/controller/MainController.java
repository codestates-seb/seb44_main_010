package com.The_10th_Finance.domain.controller;

import com.The_10th_Finance.domain.getdailysum.DailyPaymentResponse;
import com.The_10th_Finance.domain.getmonthlysum.MonthlyResoponse;
import com.The_10th_Finance.domain.getmonthlysum.MonthlyResponseDto;
import com.The_10th_Finance.domain.getdailysum.AccountDailyService;
import com.The_10th_Finance.domain.getmonthlysum.AccountMonthlySumService;
import com.The_10th_Finance.domain.paymenttransaction.PaymentSumService;
import com.The_10th_Finance.payment.db.Payment;
import com.The_10th_Finance.payment.mapper.PaymentMapper;
import com.The_10th_Finance.payment.model.PaymentPost;
import com.The_10th_Finance.payment.model.PaymentResponse;
import com.The_10th_Finance.payment.service.PaymentService;
import com.The_10th_Finance.response.Response;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/consumption")
public class MainController {

    private final AccountMonthlySumService accountMonthlySumService;
    private final AccountDailyService accountDailyService;
    private final PaymentSumService paymentService;
    private final PaymentMapper paymentMapper;


    @PostMapping("/day_upload")
    public Response.SuccessResponse postTodo(@Valid @RequestBody PaymentPost paymentPost){
        Payment payment =paymentService.post(paymentMapper.paymentPostToPayment(paymentPost));
        return  new Response.SuccessResponse<>(paymentMapper.paymentToPaymentResponse(payment), HttpStatus.CREATED);
    }

    @GetMapping("/cacheing/{userId}/{Month}")
    public Response.SuccessResponse getMyAccount(@PathVariable(name = "userId") Long userId,@PathVariable(name = "Month")int Month){
        MonthlyResoponse monthlyResponse =accountMonthlySumService.getMonthlySum(userId, Month);
        return  new Response.SuccessResponse<>(monthlyResponse, HttpStatus.CREATED);
    }

    @GetMapping("/cache/{userId}/{Month}")
    public Response.SuccessResponse getAccount(@PathVariable(name = "userId") Long userId,@PathVariable(name = "Month")int Month){
        MonthlyResponseDto monthlyResponse =accountMonthlySumService.makeCacheData(userId, Month);
        return  new Response.SuccessResponse<>(monthlyResponse, HttpStatus.CREATED);
    }
//    @GetMapping("/{userId}/{Month}")
//    public ResponseEntity getCalienderAccount(@PathVariable(name = "userId") Long userId,@PathVariable(name = "Month") int Month){
//        accountDailyService.getCalinderSum(userId, Month);
//        return  new ResponseEntity(HttpStatus.CREATED);
//    }

    @GetMapping("/daily/{userId}/{month}/{date}")
    public Response.SuccessResponse getAccount(@PathVariable(name = "userId") Long userId,@PathVariable(name = "month")int month,@PathVariable(name = "date")int date){
        DailyPaymentResponse dailyPaymentResponse =accountDailyService.getDailySum(userId, month,date);
        return new Response.SuccessResponse<>(dailyPaymentResponse,HttpStatus.CREATED);
    }


    @GetMapping("/monthly/{userId}/{Month}")
    public Response.SuccessResponse getMonthlySum(@PathVariable(name = "userId") Long userId,@PathVariable(name = "Month")int Month){
        List<PaymentResponse> paymentResponseList =accountDailyService.getMonthlySum(userId, Month);
        return  new Response.SuccessResponse<>(paymentResponseList,HttpStatus.CREATED);
    }
}
