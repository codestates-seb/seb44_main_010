package com.The_10th_Finance.payment.service;

import com.The_10th_Finance.Sumentity;
import com.The_10th_Finance.categorysum.db.CategorySum;
import com.The_10th_Finance.categorysum.service.CategorySumService;
import com.The_10th_Finance.dailiysum.db.DailySum;
import com.The_10th_Finance.dailiysum.service.DailySumService;
import com.The_10th_Finance.error.BusinessLogicException;
import com.The_10th_Finance.error.ExceptionCode;
import com.The_10th_Finance.monthlysum.db.MonthlySum;
import com.The_10th_Finance.monthlysum.service.MonthlySumService;
import com.The_10th_Finance.payment.db.Payment;
import com.The_10th_Finance.payment.db.PaymentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class PaymentSumService {

    private final PaymentRepository paymentRepository;
    private final DailySumService dailySumService;
    private final MonthlySumService monthlySumService;

    private final CategorySumService categorySumService;

    //repactorying 대상 세가지 대상이 속성이 동일해서 하나의 Sum객체를 만들어서 하나의 메서드로 처리할 예정 묶기전
    //        DailySum dailySum = dailySumService.findbyDateandId(payment.getPaymentTime(),payment.getAccountId())
//                                .map(ds -> getUpdatedDailySum(payment, ds))
//                                .orElseGet(() -> createNewDailySum(payment));

//       MonthlySum monthlySum = monthlySumService.findbyDateandId(payment.getPaymentTime().getYear(),payment.getPaymentTime().getMonthValue(),payment.getAccountId())
//                       .map(ms-> getUpdatedMonthlySum(payment,ms))
//                               .orElseGet(()->createNewMonthilySum(payment));

    //        CategorySum categorySum = categorySumService.findbyDateandId(payment.getPaymentTime().getYear(),payment.getPaymentTime().getMonthValue(),payment.getCategory(),payment.getAccountId())
//                       .map(cs ->getUpdatedCategorySum(payment,cs))
//                               .orElseGet(()->createNewCategorySum(payment));
    @Transactional
    public Payment post(Payment paymentPostToPayment) {

        Payment payment =paymentRepository.save(paymentPostToPayment);
        DailySum dailySum = dailySumService.findbyDateandId(payment.getPaymentTime(),payment.getAccountId())
                .orElseGet(() -> createNewDailySum(payment));
        getUpdated(payment,dailySum);
        dailySumService.post(dailySum);

        MonthlySum monthlySum = monthlySumService.findbyDateandId(payment.getPaymentTime().getYear(),payment.getPaymentTime().getMonthValue(),payment.getAccountId())
                .orElseGet(()->createNewMonthilySum(payment));
        getUpdated(payment,monthlySum);
        monthlySumService.post(monthlySum);


        CategorySum categorySum = categorySumService.findbyDateandId(payment.getPaymentTime().getYear(),payment.getPaymentTime().getMonthValue(),payment.getCategory(),payment.getAccountId())
                .orElseGet(()->createNewCategorySum(payment));
        getUpdated(payment,categorySum);
         categorySumService.post(categorySum);


        return payment;
    }


    private void getUpdated(Payment payment, Sumentity sumentity){
        if(payment.getAmount().compareTo(BigDecimal.ZERO)<0){
            sumentity.setMonthlyExpense(sumentity.getMonthlyExpense().add(payment.getAmount()));
        }else{
            sumentity.setMonthlyIncome(sumentity.getMonthlyIncome().add(payment.getAmount()));
        }
        sumentity.setMonthlyTotal(sumentity.getMonthlyTotal().add(payment.getAmount()));
    }


    private MonthlySum createNewMonthilySum(Payment payment) {
        BigDecimal amount = payment.getAmount();
        BigDecimal dailyExpense = amount.compareTo(BigDecimal.ZERO)<0 ? amount : BigDecimal.ZERO;
        BigDecimal dailyIncome = amount.compareTo(BigDecimal.ZERO)<0 ? BigDecimal.ZERO : amount;

        return new MonthlySum(payment.getPaymentTime(), dailyIncome, dailyExpense, amount, payment.getAccountId());
    }

    private CategorySum createNewCategorySum(Payment payment) {
        BigDecimal amount = payment.getAmount();
        BigDecimal dailyExpense = amount.compareTo(BigDecimal.ZERO)<0 ? amount : BigDecimal.ZERO;
        BigDecimal dailyIncome = amount.compareTo(BigDecimal.ZERO)<0 ? BigDecimal.ZERO : amount;

        return new CategorySum(payment.getCategory(),payment.getPaymentTime(), dailyIncome, dailyExpense, amount, payment.getAccountId());
    }

    private DailySum createNewDailySum(Payment payment) {
        BigDecimal amount = payment.getAmount();
        BigDecimal dailyExpense = amount.compareTo(BigDecimal.ZERO)<0 ? amount : BigDecimal.ZERO;
        BigDecimal dailyIncome = amount.compareTo(BigDecimal.ZERO)<0 ? BigDecimal.ZERO : amount;

        return new DailySum(payment.getPaymentTime(), dailyIncome, dailyExpense, amount, payment.getAccountId());
    }
}
