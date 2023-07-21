package com.The_10th_Finance.cashpay.service;

import com.The_10th_Finance.cashDailySum.db.CashDailySum;
import com.The_10th_Finance.cashDailySum.service.CashDailyService;
import com.The_10th_Finance.cashpay.db.CashPayment;
import com.The_10th_Finance.cashpay.db.CashPaymentRepository;
import com.The_10th_Finance.property.service.PropertyService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;


@Service
@Slf4j
@RequiredArgsConstructor
public class CashPaymentService {

    private final CashPaymentRepository cashPaymentRepository;
    private final CashDailyService cashDailyService;


    @Transactional
    public CashPayment post(CashPayment cashPayment) {
        CashPayment  cashPaymentpayment =cashPaymentRepository.save(cashPayment);
        CashDailySum cashDailySum = cashDailyService.getCashinfo(cashPayment.getPropertyId(),cashPaymentpayment.getPaymentTime().getMonthValue(),cashPaymentpayment.getPaymentTime().getDayOfMonth());
        BigDecimal amount = cashPayment.getAmount();
        if(cashDailySum==null){
            BigDecimal expense = amount.compareTo(BigDecimal.ZERO) < 0 ? amount : BigDecimal.ZERO;
            BigDecimal income = amount.compareTo(BigDecimal.ZERO) < 0 ? BigDecimal.ZERO : amount;

            cashDailyService.post(CashDailySum.builder().propertyId(cashPayment.getPropertyId()).date(cashPayment.getPaymentTime()).monthlyIncome(income).monthlyExpense(expense).monthlyTotal(amount).build());
        }else{

            if(amount.compareTo(BigDecimal.ZERO) < 0){

                cashDailySum.setMonthlyExpense(cashDailySum.getMonthlyExpense().add(amount));
            }else{
                cashDailySum.setMonthlyIncome(cashDailySum.getMonthlyIncome().add(amount));
            }
            cashDailySum.setMonthlyTotal(cashDailySum.getMonthlyTotal().add(amount));
            cashDailyService.post(cashDailySum);
        }
        return cashPaymentpayment;
    }

    @Transactional(readOnly = true)
    public Map<String, BigDecimal> getMonthSum(int month, Long moneyId) {
        Map<String, BigDecimal> map=cashPaymentRepository.findMonthlySummary(month,moneyId).orElse(null);
        log.info("{}",map);
        return map;
    }
    @Transactional(readOnly = true)
    public Map<String, BigDecimal> getDailySum(int month,int day,Long moneyId) {
        Map<String, BigDecimal> map=cashPaymentRepository.findDailyAndSum(day,month,moneyId).orElse(null);
        log.info("{}",map);
        return map;
    }
    @Transactional(readOnly = true)
    public List<Object[]> getCategorySum(int month,Long moneyId) {
        List<Object[]> map=cashPaymentRepository.findMonthlySumByCategory(month,moneyId).orElse(null);
        log.info("{}",moneyId);
        return map;
    }

    @Transactional(readOnly = true)
    public List<CashPayment> getMonthlyCashPayment(int month, Long moneyId) {
        List<CashPayment> map=cashPaymentRepository.findMonthly(month,moneyId).orElse(null);
        log.info("{}",moneyId);
        return map;
    }

    @Transactional(readOnly = true)
    public List<CashPayment> getDailyCashPayment(int date,int month,Long moneyId) {
        List<CashPayment> map=cashPaymentRepository.findDaily(date,month,moneyId).orElse(null);
        log.info("{}",moneyId);
        return map;
    }
}
