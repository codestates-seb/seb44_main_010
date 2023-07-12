package com.The_10th_Finance.monthlysum.service;

import com.The_10th_Finance.dailiysum.db.DailySum;
import com.The_10th_Finance.error.BusinessLogicException;
import com.The_10th_Finance.error.ExceptionCode;
import com.The_10th_Finance.monthlysum.db.MonthlySum;
import com.The_10th_Finance.monthlysum.db.MonthlySumRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
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


    //모든 달의 정보를 한번에 얻어오는 쿼리
    public List<MonthlySum> getMonthlySumList(List<Long> accountId) {
          return  monthlySumRepository.findDailySumByAccountIdIn(accountId).orElseThrow(()->new BusinessLogicException(ExceptionCode.USERNOTFOUND));
    }

    //이번달과 전달의 합을 한번에 얻어오는 쿼리
    public List<MonthlySum> getMonthlySumListbyMonth(List<Long> accountId,int Month) {
        List<Integer> month = new ArrayList<>();
        if(Month!=1){
            month.add(Month-1);
            month.add(Month);
        }else{
            month.add(Month);
        }
        return  monthlySumRepository.findMonthlySumByAccountIdInAndMonthInOrderByDateDesc(accountId,month).orElseThrow(()->new BusinessLogicException(ExceptionCode.USERNOTFOUND));
    }
}
