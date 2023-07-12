package com.The_10th_Finance.main.controller;

import com.The_10th_Finance.accounts.db.Accounts;
import com.The_10th_Finance.accounts.model.AccountsPost;
import com.The_10th_Finance.main.model.MonthlyResponseDto;
import com.The_10th_Finance.main.service.AccountDailyService;
import com.The_10th_Finance.main.service.AccountMonthlySumService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/main")
public class MainController {

    private final AccountMonthlySumService accountMonthlySumService;
    private final AccountDailyService accountDailyService;

    @GetMapping("/{userId}/{Month}")
    public ResponseEntity getAccount(@PathVariable(name = "userId") Long userId,@PathVariable(name = "Month")int Month){
        MonthlyResponseDto monthlyResponseDto =accountMonthlySumService.getMonthlySum(userId, Month);
        log.info("{},{},{},{},{}",monthlyResponseDto.getUserResponseDto(),monthlyResponseDto.getAashAccount(),monthlyResponseDto.getAashAccount(),monthlyResponseDto.getJungunAccount());
        return  new ResponseEntity(monthlyResponseDto,HttpStatus.CREATED);
    }

//    @GetMapping("/{userId}/{Month}")
//    public ResponseEntity getCalienderAccount(@PathVariable(name = "userId") Long userId,@PathVariable(name = "Month") int Month){
//        accountDailyService.getCalinderSum(userId, Month);
//        return  new ResponseEntity(HttpStatus.CREATED);
//    }
}
