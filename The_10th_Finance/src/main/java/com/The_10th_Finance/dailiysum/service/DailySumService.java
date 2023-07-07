package com.The_10th_Finance.dailiysum.service;

import com.The_10th_Finance.dailiysum.db.DailySum;
import com.The_10th_Finance.dailiysum.db.DailySumRepository;
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
    public Optional<List<DailySum>> getDailySumList(List<Long> accountId){
        return  dailySumRepository.findDailySumByAccountIds(accountId);
    }
    public void post(DailySum dailySum){
        dailySumRepository.save(dailySum);
    }
}
