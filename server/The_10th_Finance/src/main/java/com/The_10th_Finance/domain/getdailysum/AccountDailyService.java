package com.The_10th_Finance.domain.getdailysum;

import com.The_10th_Finance.accounts.db.Accounts;
import com.The_10th_Finance.accounts.model.AccountsResponseDto;
import com.The_10th_Finance.accounts.service.AccountsService;
import com.The_10th_Finance.dailiysum.db.DailySum;
import com.The_10th_Finance.dailiysum.service.DailySumService;
import com.The_10th_Finance.payment.model.PaymentResponse;
import com.The_10th_Finance.payment.service.PaymentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class AccountDailyService {

    private final AccountsService accountsService;
    private final DailySumService dailySumService;
    private final PaymentService paymentService;


    public void getCalinderSum(Long userId,int Month) {

        List<AccountsResponseDto> accountsList= accountsService.getMyAccount(userId);
        List<Long> accountId = getAccountIdln(accountsList);
        List<DailySum> dailySums = dailySumService.getDailySumListByMonth(accountId,Month);
        List<DaySummary> daySummaries = new ArrayList<>();
        for(DailySum dailySum:dailySums) {
            DaySummary daySummary = new DaySummary(
                    dailySum.getDate(),
                    dailySum.getMonthlyIncome(),
                    dailySum.getMonthlyExpense()
            );
            daySummaries.add(daySummary);
        }

    }

    public List<PaymentResponse> getMonthlySum(Long userId,int Month) {

        List<AccountsResponseDto> accountsList= accountsService.getMyAccount(userId);
        List<Long> accountId = getAccountIdln(accountsList);
        List<PaymentResponse> paymentResponses = paymentService.getAllpayment(accountId,Month);
        return paymentResponses;

    }


    public DailyPaymentResponse getDailySum(Long userId,int Month,int date) {

        List<AccountsResponseDto> accountsList= accountsService.getMyAccount(userId);
        List<Long> accountId = getAccountIdln(accountsList);
        List<PaymentResponse> paymentResponses = paymentService.getONepayment(accountId,Month,date);
        log.info("{}",paymentResponses.get(0));
        DailySum dailySum = dailySumService.getDailySumListByMonthDate(accountId,Month,date);
            DaySummary daySummary = new DaySummary(
                    dailySum.getDate(),
                    dailySum.getMonthlyIncome(),
                    dailySum.getMonthlyExpense(),
                    dailySum.getMonthlyTotal()
            );
            return DailyPaymentResponse.builder().daySummary(daySummary).paymentResponses(paymentResponses).build();
        }

    private static List<Long> getAccountIdln(List<AccountsResponseDto> accountsList) {
        return accountsList.stream()
                .map(AccountsResponseDto::getAccountId)
                .collect(Collectors.toList());
    }

}
