package com.The_10th_Finance.monthlysum.service;

import com.The_10th_Finance.monthlysum.db.MonthlySum;
import com.The_10th_Finance.monthlysum.db.MonthlySumRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class MonthlySumService {
    private final MonthlySumRepository monthlySumRepository;

    public Optional<MonthlySum> findbyDateandId(int year,int month , Long accountId){
        return  monthlySumRepository.findDailySumByDateAndAccountId(year,month,accountId);
    }

    public void post(MonthlySum dailySum){
        monthlySumRepository.save(dailySum);
    }
}
