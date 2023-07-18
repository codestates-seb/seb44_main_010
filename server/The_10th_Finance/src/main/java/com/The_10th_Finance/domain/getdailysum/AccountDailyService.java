package com.The_10th_Finance.domain.getdailysum;

import com.The_10th_Finance.accounts.model.AccountsBankResponse;
import com.The_10th_Finance.accounts.service.AccountBankService;
import com.The_10th_Finance.dailiysum.db.DailySum;
import com.The_10th_Finance.dailiysum.service.DailySumService;
import com.The_10th_Finance.payment.model.PaymentBankResponse;
import com.The_10th_Finance.payment.model.PaymentResponse;
import com.The_10th_Finance.payment.service.PaymentService;
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


    public List<DaySummary> getCalenderSum(Long userId, int Month) {

        List<AccountsBankResponse> accountsList= accountBankService.getMyAccountAndBank(userId);
        List<Long> accountId = getAccountIdln(accountsList);
        List<DailySum> dailySums = dailySumService.getDailySumListByMonth(accountId,Month);
        List<DaySummary> daySummaries = new ArrayList<>();
        LocalDateTime localDateTime = dailySums.get(0).getDate();
        BigDecimal income=BigDecimal.ZERO,expense=BigDecimal.ZERO;
        for(DailySum dailySum:dailySums) {
            if(!dailySum.getDate().equals(localDateTime)) {
                daySummaries.add( DaySummary.builder().date(localDateTime).expense(expense).income(income).build());
                localDateTime = dailySum.getDate();
                income=BigDecimal.ZERO;
                expense=BigDecimal.ZERO;
            }
            income = income.add(dailySum.getMonthlyIncome());
            expense = expense.add(dailySum.getMonthlyExpense());
            log.info("{}",income);
            log.info("{}",expense);
        }
        daySummaries.add( DaySummary.builder().date(localDateTime).expense(expense).income(income).build());
        return daySummaries;

    }

    public List<PaymentBankResponse> getMonthlySum(Long userId,int Month) {

        List<AccountsBankResponse> accountsList= accountBankService.getMyAccountAndBank(userId);
        Map<Long, String> accountMap = getAccountIdToAccountTypeMap(accountsList);
        List<Long> accountId = getAccountIdln(accountsList);
        List<PaymentResponse> paymentResponses = paymentService.getAllpayment(accountId,Month);
        List<PaymentBankResponse> paymentBankResponses = new ArrayList<>();
        for(PaymentResponse paymentResponse:paymentResponses){
            paymentBankResponses.add(PaymentBankResponse.builder().paymentResponse(paymentResponse).bankName(accountMap.get(paymentResponse.getAccountId())).build());
        }

        return paymentBankResponses;

    }


    public DailyPaymentResponse getDailySum(Long userId,int Month,int date) {

        List<AccountsBankResponse> accountsList= accountBankService.getMyAccountAndBank(userId);
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

            return DailyPaymentResponse.builder().daySummary(DaySummary.builder().date(localDateTime).expense(expense).income(income).total(total).build()).paymentResponses(paymentBankResponses).build();
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
