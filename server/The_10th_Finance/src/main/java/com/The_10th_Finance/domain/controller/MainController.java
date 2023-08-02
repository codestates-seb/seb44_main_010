package com.The_10th_Finance.domain.controller;

import com.The_10th_Finance.domain.getcategorysum.AccountCategoryService;
import com.The_10th_Finance.domain.getcategorysum.CategoryResponse;
import com.The_10th_Finance.domain.getdailysum.DailyPaymentResponse;
import com.The_10th_Finance.domain.getdailysum.DayCashSummary;
import com.The_10th_Finance.domain.getdailysum.DaySummary;
import com.The_10th_Finance.domain.getmonthlysum.MonthlyResoponse;
import com.The_10th_Finance.domain.getmonthlysum.MonthlyResponseDto;
import com.The_10th_Finance.domain.getdailysum.AccountDailyService;
import com.The_10th_Finance.domain.getmonthlysum.AccountMonthlySumService;
import com.The_10th_Finance.domain.paymenttransaction.PaymentSumService;
import com.The_10th_Finance.payment.db.Payment;
import com.The_10th_Finance.payment.mapper.PaymentMapper;
import com.The_10th_Finance.payment.model.MonthlyPaymentResponse;
import com.The_10th_Finance.payment.model.PaymentBankResponse;
import com.The_10th_Finance.payment.model.PaymentPost;
import com.The_10th_Finance.payment.model.PaymentResponse;
import com.The_10th_Finance.response.Response;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("")
public class MainController {

    private final AccountMonthlySumService accountMonthlySumService;
    private final AccountDailyService accountDailyService;
    private final AccountCategoryService accountCategoryService;
    private final PaymentSumService paymentService;
    private final PaymentMapper paymentMapper;


    @PostMapping("/consumption/day_upload")
    public Response.SuccessResponse postTodo(@Valid @RequestBody PaymentPost paymentPost){
        Payment payment =paymentService.post(paymentMapper.paymentPostToPayment(paymentPost));
        return  new Response.SuccessResponse<>(paymentMapper.paymentToPaymentResponse(payment), HttpStatus.CREATED);
    }

    @GetMapping("/asset/myInfo/{userId}/{Month}")
    public Response.SuccessResponse getMyAccount(@PathVariable(name = "userId") Long userId,@PathVariable(name = "Month")int Month){
        MonthlyResoponse monthlyResponse =accountMonthlySumService.getMonthlySum(userId, Month);
        return  new Response.SuccessResponse<>(monthlyResponse, HttpStatus.CREATED);
    }

    @GetMapping("/asset/profile/{userId}/{Month}")
    public Response.SuccessResponse getAccount(@PathVariable(name = "userId") Long userId,@PathVariable(name = "Month")int Month){
        MonthlyResponseDto monthlyResponse =accountMonthlySumService.makeCacheData(userId, Month);
        return  new Response.SuccessResponse<>(monthlyResponse, HttpStatus.CREATED);
    }
    @GetMapping("/consumption/category/{userId}/{Month}")
    public Response.SuccessResponse getCategoryrAccount(@PathVariable(name = "userId") Long userId, @PathVariable(name = "Month") int Month){
        CategoryResponse categoryServiceDailySum = accountCategoryService.getDailySum(userId, Month);
        return  new Response.SuccessResponse<>(categoryServiceDailySum,HttpStatus.CREATED);
    }

    @GetMapping("/consumption/calender/{userId}/{Month}")
    public Response.SuccessResponse getCalenderAccount(@PathVariable(name = "userId") Long userId, @PathVariable(name = "Month") int Month){
        DayCashSummary daySummaries = accountDailyService.getCalenderSum(userId, Month);
        return  new Response.SuccessResponse<>(daySummaries,HttpStatus.CREATED);
    }

    @GetMapping("/consumption/daily/{userId}/{month}/{date}")
    public Response.SuccessResponse getAccount(@PathVariable(name = "userId") Long userId,@PathVariable(name = "month")int month,@PathVariable(name = "date")int date){
        DailyPaymentResponse dailyPaymentResponse =accountDailyService.getDailySum(userId, month,date);
        return new Response.SuccessResponse<>(dailyPaymentResponse,HttpStatus.CREATED);
    }


    @GetMapping("/consumption/monthly/{userId}/{Month}")
    public Response.SuccessResponse getMonthlySum(@PathVariable(name = "userId") Long userId,@PathVariable(name = "Month")int Month){
        MonthlyPaymentResponse paymentResponseList =accountDailyService.getMonthlySum(userId, Month);
        return  new Response.SuccessResponse<>(paymentResponseList,HttpStatus.CREATED);
    }
}
