package com.The_10th_Finance.bank.controller;

import com.The_10th_Finance.bank.db.Bank;
import com.The_10th_Finance.bank.mapper.BankMapper;
import com.The_10th_Finance.bank.model.BankPost;
import com.The_10th_Finance.bank.service.BankService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/bank")
public class BankController {

    private final BankMapper bankMapper;
    private final BankService bankService;

    @PostMapping("/post")
    public ResponseEntity postBank(@Valid @RequestBody BankPost bankPost){
        Bank bank = bankService.post(bankMapper.bankPostDtoToBank(bankPost));
        return new ResponseEntity(bankMapper.bankToBankResponse(bank),HttpStatus.CREATED);
    }
}
