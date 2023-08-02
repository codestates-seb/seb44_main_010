package com.The_10th_Finance.domain.getdailysum;

import com.The_10th_Finance.accounts.model.AccountsBankResponse;
import com.The_10th_Finance.accounts.service.AccountBankService;
import com.The_10th_Finance.cashDailySum.db.CashDailySum;
import com.The_10th_Finance.cashDailySum.service.CashDailyService;
import com.The_10th_Finance.cashpay.db.CashPayment;
import com.The_10th_Finance.cashpay.service.CashPaymentService;
import com.The_10th_Finance.dailiysum.db.DailySum;
import com.The_10th_Finance.dailiysum.service.DailySumService;
import com.The_10th_Finance.payment.model.MonthlyPaymentResponse;
import com.The_10th_Finance.payment.model.PaymentBankResponse;
import com.The_10th_Finance.payment.model.PaymentResponse;
import com.The_10th_Finance.payment.service.PaymentService;
import com.The_10th_Finance.property.service.PropertyService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class AccountDailyService {

    private final AccountBankService accountBankService;
    private final DailySumService dailySumService;
    private final PaymentService paymentService;

    private final CashPaymentService cashPaymentService;
    private final PropertyService propertyService;
    private final CashDailyService cashDailyService;
    public DayCashSummary getCalenderSum(Long userId, int Month) {
        Long moneyId = propertyService.getMoney(userId);
        List<AccountsBankResponse> accountsList= accountBankService.getMyAccountAndBank(1L);
        List<Long> accountId = getAccountIdln(accountsList);
        List<DailySum> dailySums = dailySumService.getDailySumListByMonth(accountId,Month);
        List<DaySummary> daySummaries = new ArrayList<>();
        log.info("{}",dailySums.size());
        if(dailySums!=null) {

            LocalDateTime localDateTime = dailySums.get(0).getDate();
            BigDecimal income = BigDecimal.ZERO, expense = BigDecimal.ZERO;
            for (DailySum dailySum : dailySums) {
                if (!dailySum.getDate().equals(localDateTime)) {
                    daySummaries.add(DaySummary.builder().date(localDateTime).expense(expense).income(income).build());
                    localDateTime = dailySum.getDate();
                    income = BigDecimal.ZERO;
                    expense = BigDecimal.ZERO;
                }
                income = income.add(dailySum.getMonthlyIncome());
                expense = expense.add(dailySum.getMonthlyExpense());
                log.info("{}", income);
                log.info("{}", expense);
            }
            daySummaries.add( DaySummary.builder().date(localDateTime).expense(expense).income(income).build());
        }
        List<CashDailySum> cashDailySums = new ArrayList<>();
        if(moneyId!=null) {
            cashDailySums = cashDailyService.getCashMonthly(moneyId,Month);
        }


        return DayCashSummary.builder().daySummaries(daySummaries).cashDailySums(cashDailySums).build();

    }

    public MonthlyPaymentResponse getMonthlySum(Long userId,int Month) {
        Long moneyId = propertyService.getMoney(userId);
        List<AccountsBankResponse> accountsList= accountBankService.getMyAccountAndBank(1L);
        Map<Long, String> accountMap = getAccountIdToAccountTypeMap(accountsList);
        List<Long> accountId = getAccountIdln(accountsList);
        List<PaymentResponse> paymentResponses = paymentService.getAllpayment(accountId,Month);
        List<PaymentBankResponse> paymentBankResponses = new ArrayList<>();
        List<CashPayment>cashPayments = new ArrayList<>();
        for(PaymentResponse paymentResponse:paymentResponses){
            paymentBankResponses.add(PaymentBankResponse.builder().paymentResponse(paymentResponse).bankName(accountMap.get(paymentResponse.getAccountId())).build());
        }
        if(moneyId!=null) {
             cashPayments = cashPaymentService.getMonthlyCashPayment(Month,moneyId);
        }
        return MonthlyPaymentResponse.builder().paymentBankResponses(paymentBankResponses).cashPayments(cashPayments).build();


    }


    public DailyPaymentResponse getDailySum(Long userId,int Month,int date) {
        Long moneyId = propertyService.getMoney(userId);
        List<AccountsBankResponse> accountsList= accountBankService.getMyAccountAndBank(1L);
        List<Long> accountId = getAccountIdln(accountsList);
        Map<Long, String> accountMap = getAccountIdToAccountTypeMap(accountsList);
        List<PaymentResponse> paymentResponses = paymentService.getONepayment(accountId,Month,date);
        List<PaymentBankResponse> paymentBankResponses = new ArrayList<>();
        for(PaymentResponse paymentResponse:paymentResponses){
            paymentBankResponses.add(PaymentBankResponse.builder().paymentResponse(paymentResponse).bankName(accountMap.get(paymentResponse.getAccountId())).build());
        }

        List<DailySum> dailySums = dailySumService.getDailySumListByMonthDate(accountId,Month,date);
        LocalDateTime localDateTime = dailySums.get(0).getDate();



        BigDecimal income=BigDecimal.ZERO,expense=BigDecimal.ZERO,total=BigDecimal.ZERO;
        for(DailySum dailySum:dailySums) {
            income = income.add(dailySum.getMonthlyIncome());
            expense = expense.add(dailySum.getMonthlyExpense());
            total = total.add(dailySum.getMonthlyTotal());
        }

        //현금 더하는 로직
        List<CashPayment>cashPayments = new ArrayList<>();
        if(moneyId!=null) {
            cashPayments = cashPaymentService.getDailyCashPayment(date,Month,moneyId);
            Map<String, BigDecimal> map = cashPaymentService.getDailySum(Month,date,moneyId);
            income = income.add(map.get("total_income")!=null?map.get("total_income"):BigDecimal.ZERO);
            expense = expense.add(map.get("total_expenses")!=null?map.get("total_expenses"):BigDecimal.ZERO);
            total = total.add(map.get("total")!=null?map.get("total"):BigDecimal.ZERO);
        }

            return DailyPaymentResponse.builder().daySummary(DaySummary.builder().date(localDateTime).expense(expense).income(income).total(total).build()).paymentResponses(paymentBankResponses).cashPayments(cashPayments).build();
        }

    private static List<Long> getAccountIdln(List<AccountsBankResponse> accountsList) {
        return accountsList.stream()
                .map(AccountsBankResponse::getAccountId)
                .collect(Collectors.toList());
    }
    private static Map<Long, String> getAccountIdToAccountTypeMap(List<AccountsBankResponse> accountsList) {
        return accountsList.stream()
                .collect(Collectors.toMap(AccountsBankResponse::getAccountId, AccountsBankResponse::getBankname));
    }
}
