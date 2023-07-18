package com.The_10th_Finance.domain.paymenttransaction;

import com.The_10th_Finance.accounts.db.Accounts;
import com.The_10th_Finance.domain.paymenttransaction.Sumentity;
import com.The_10th_Finance.accounts.service.AccountsService;
import com.The_10th_Finance.categorysum.db.CategorySum;
import com.The_10th_Finance.categorysum.service.CategorySumService;
import com.The_10th_Finance.dailiysum.db.DailySum;
import com.The_10th_Finance.dailiysum.service.DailySumService;
import com.The_10th_Finance.monthlysum.db.MonthlySum;
import com.The_10th_Finance.monthlysum.service.MonthlySumService;
import com.The_10th_Finance.payment.db.Payment;
import com.The_10th_Finance.payment.db.PaymentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.math.BigDecimal;

@Service
@Slf4j
@RequiredArgsConstructor
public class PaymentSumService {

    private final PaymentRepository paymentRepository;
    private final DailySumService dailySumService;
    private final MonthlySumService monthlySumService;

    private final AccountsService accountsService;
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

        //계좌에서 돈뺴기 or 돈 더하기
        Accounts accounts = accountsService.getOne(paymentPostToPayment.getAccountId());
        BigDecimal amount = accounts.getBalance().add(paymentPostToPayment.getAmount());
        if (amount.compareTo(BigDecimal.ZERO) >= 0) {
            // 금액이 0보다 크면 계정의 잔액을 업데이트합니다.
            accounts.setBalance(amount);
            accountsService.post(accounts); // 잔액 업데이트를 반영하도록 accounts 객체를 저장합니다. 이 부분은 당신의 서비스 클래스에 따라 조정이 필요합니다.
        } else {
            // 금액이 0 이하라면 예외를 발생시킵니다.
            throw new IllegalArgumentException("계정의 잔액은 0 이상이어야 합니다.");
        }

        //결제 내역이 들어올 경우 결제내역 먼저 저장
        Payment payment = paymentRepository.save(paymentPostToPayment);

        //DailySum 테이블에서 기존 일 소득 소비와 합계를 가져와서 갱신
        DailySum dailySum = dailySumService.findbyDateandId(payment.getPaymentTime(), payment.getAccountId())
                .map(ds -> {
                    getUpdated(payment, ds);
                    return ds;
                })
                .orElseGet(() -> createNewDailySum(payment));
        dailySumService.post(dailySum);




        //MonthlySum 테이블에서 기존 월 소득 소비와 합계를 가져와서 갱신
        MonthlySum monthlySum = monthlySumService.findbyDateandId(payment.getPaymentTime().getYear(), payment.getPaymentTime().getMonthValue(), payment.getAccountId())
                .map(ms ->{getUpdated(payment,ms);return ms;})
                .orElseGet(() -> createNewMonthilySum(payment));
        monthlySumService.post(monthlySum);


        //CategorySum 테이블에서 카테고리별 월 소득 소비와 합계를 가져와서 갱신
        CategorySum categorySum = categorySumService.findbyDateandId(payment.getPaymentTime().getYear(), payment.getPaymentTime().getMonthValue(), payment.getCategory(), payment.getAccountId())
                .map(cs -> {
                    getUpdated(payment, cs);
                    return cs;
                })
                .orElseGet(() -> createNewCategorySum(payment));
        categorySumService.post(categorySum);


        return payment;
    }

    //sum table을 공통 속성으로 묶어서 한번에 update하는 코두
    private void getUpdated(Payment payment, Sumentity sumentity) {
        if (payment.getAmount().compareTo(BigDecimal.ZERO) < 0) {
            sumentity.setMonthlyExpense(sumentity.getMonthlyExpense().add(payment.getAmount()));
        } else {
            sumentity.setMonthlyIncome(sumentity.getMonthlyIncome().add(payment.getAmount()));
        }
        sumentity.setMonthlyTotal(sumentity.getMonthlyTotal().add(payment.getAmount()));
    }

    //sumtable들이 비어있을경우 새롭게 갱신하는 코드
    private String getAccountType(Payment payment) {
        return accountsService.getAccountType(payment.getAccountId());
    }

    private BigDecimal[] getIncomeExpense(Payment payment) {
        BigDecimal amount = payment.getAmount();
        BigDecimal expense = amount.compareTo(BigDecimal.ZERO) < 0 ? amount : BigDecimal.ZERO;
        BigDecimal income = amount.compareTo(BigDecimal.ZERO) < 0 ? BigDecimal.ZERO : amount;

        return new BigDecimal[]{income, expense};
    }

    private MonthlySum createNewMonthilySum(Payment payment) {
        String accountType = getAccountType(payment);
        BigDecimal[] incomeExpense = getIncomeExpense(payment);
        return new MonthlySum(payment.getPaymentTime(), incomeExpense[0], incomeExpense[1], payment.getAmount(), payment.getAccountId());
    }

    private CategorySum createNewCategorySum(Payment payment) {
        String accountType = getAccountType(payment);
        BigDecimal[] incomeExpense = getIncomeExpense(payment);
        return new CategorySum(payment.getCategory(), payment.getPaymentTime(), incomeExpense[0], incomeExpense[1], payment.getAmount(), payment.getAccountId());
    }

    private DailySum createNewDailySum(Payment payment) {
        String accountType = getAccountType(payment);
        BigDecimal[] incomeExpense = getIncomeExpense(payment);
        return new DailySum(payment.getPaymentTime(), incomeExpense[0], incomeExpense[1], payment.getAmount(), payment.getAccountId());
    }
}
