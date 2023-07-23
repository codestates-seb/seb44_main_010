package com.The_10th_Finance.cashDailySum.service;

import com.The_10th_Finance.cashDailySum.db.CashDailySum;
import com.The_10th_Finance.cashDailySum.db.CashDailySumRepository;
import com.The_10th_Finance.cashpay.db.CashPaymentRepository;
import com.The_10th_Finance.dailiysum.db.DailySum;
import com.The_10th_Finance.error.BusinessLogicException;
import com.The_10th_Finance.error.ExceptionCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class CashDailyService {
    private final CashDailySumRepository cashDailySumRepository;
    @Transactional
    public CashDailySum post(CashDailySum cashDailySum){
        return  cashDailySumRepository.save(cashDailySum);
    }
    @Transactional(readOnly = true)
    public CashDailySum getCashMonth(Long propertyId){
        return  cashDailySumRepository.findDailySumByPropertyId(propertyId).orElse(null);
    }
      @Transactional(readOnly = true)
    public List<CashDailySum> getCashMonthly(Long propertyId,int Month){
        return  cashDailySumRepository.findDailySumByPropertyIdMonth(propertyId,Month).orElse(null);
    }


    public CashDailySum getCashinfo(Long propertyId, int monthValue, int dayOfMonth) {
        return  cashDailySumRepository.findDailySumByPropertyIdMonthAndMonth(propertyId,monthValue,dayOfMonth).orElse(null);
    }
}
