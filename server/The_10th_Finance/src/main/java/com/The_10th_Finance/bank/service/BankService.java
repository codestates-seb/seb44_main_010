package com.The_10th_Finance.bank.service;

import com.The_10th_Finance.bank.db.Bank;
import com.The_10th_Finance.bank.db.BankRepository;
import com.The_10th_Finance.error.BusinessLogicException;
import com.The_10th_Finance.error.ExceptionCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@Slf4j
@RequiredArgsConstructor

public class BankService {
    private final BankRepository bankRepository;
    @Transactional
       public Bank post(Bank bankPostDtoToBank) {
       return bankRepository.save(bankPostDtoToBank);
    }

    @Transactional(readOnly = true)
    public String getOne(Long bankId){
        return bankRepository.findBankNameByBankId(bankId).orElse("");
    }
}
