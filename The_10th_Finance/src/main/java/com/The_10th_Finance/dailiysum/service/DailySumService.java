package com.The_10th_Finance.dailiysum.service;

import com.The_10th_Finance.dailiysum.db.DailySum;
import com.The_10th_Finance.dailiysum.db.DailySumRepository;
import com.The_10th_Finance.error.BusinessLogicException;
import com.The_10th_Finance.error.ExceptionCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class DailySumService {
    private final DailySumRepository dailySumRepository;

    public Optional<DailySum> findbyDateandId(LocalDateTime localDateTime , Long accountId){
        return  dailySumRepository.findDailySumByDateAndAccountId(localDateTime,accountId);
    }
    public List<DailySum> getDailySumList(List<Long> accountId){
        return  dailySumRepository.findDailySumByAccountIdIn(accountId).orElseThrow(()->new BusinessLogicException(ExceptionCode.USERNOTFOUND));
    }

    public List<DailySum> getDailySumListByMonth(List<Long> accountId,int Month){
        return  dailySumRepository.findDailySumByAccountIdInAndMonth(accountId,Month).orElseThrow(()->new BusinessLogicException(ExceptionCode.USERNOTFOUND));
    }
    public void post(DailySum dailySum){
        dailySumRepository.save(dailySum);
    }
}
