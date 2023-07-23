package com.The_10th_Finance.dailiysum.service;

import com.The_10th_Finance.dailiysum.db.DailySum;
import com.The_10th_Finance.dailiysum.db.DailySumRepository;
import com.The_10th_Finance.error.BusinessLogicException;
import com.The_10th_Finance.error.ExceptionCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor

public class DailySumService {
    private final DailySumRepository dailySumRepository;

    @Transactional(readOnly = true)
    public Optional<DailySum> findbyDateandId(LocalDateTime localDateTime , Long accountId){
        return  dailySumRepository.findDailySumByDateAndAccountId(localDateTime,accountId);
    }
    @Transactional(readOnly = true)
    public List<DailySum> getDailySumList(List<Long> accountId){
        return  dailySumRepository.findDailySumByAccountIdIn(accountId).orElseThrow(()->new BusinessLogicException(ExceptionCode.NOSUCHFOUND));
    }
    @Transactional(readOnly = true)
    public List<DailySum> getDailySumListByMonth(List<Long> accountId,int Month){
        return  dailySumRepository.findDailySumByAccountIdInAndMonth(accountId,Month).orElseThrow(()->new BusinessLogicException(ExceptionCode.NOSUCHFOUND));
    }
    @Transactional
    public void post(DailySum dailySum){
        dailySumRepository.save(dailySum);
    }
    @Transactional(readOnly = true)
    public List<DailySum> getDailySumListByMonthDate(List<Long> accountId, int month, int date) {
        return  dailySumRepository.findDailySumByAccountIdInAndMonthAndDate(accountId,month,date).orElseThrow(()->new BusinessLogicException(ExceptionCode.NOSUCHFOUND));
    }
}
