package com.The_10th_Finance.main.service;

import com.The_10th_Finance.accounts.db.Accounts;
import com.The_10th_Finance.accounts.service.AccountsService;
import com.The_10th_Finance.dailiysum.db.DailySum;
import com.The_10th_Finance.dailiysum.service.DailySumService;
import com.The_10th_Finance.error.BusinessLogicException;
import com.The_10th_Finance.error.ExceptionCode;
import com.The_10th_Finance.main.model.DaySummary;
import com.The_10th_Finance.main.model.MonthlyResponseDto;
import com.The_10th_Finance.monthlysum.service.MonthlySumService;
import com.The_10th_Finance.user.db.User;
import com.The_10th_Finance.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class AccountDailyService {
    private final UserService userService;
    private final AccountsService accountsService;
    private final DailySumService dailySumService;


    public void getCalinderSum(Long userId,int Month) {

        List<Accounts> accountsList= accountsService.getMyAccount(userId);
        List<Long> accountId = getAccountIdln(accountsList);
        List<DailySum> dailySums = dailySumService.getDailySumListByMonth(accountId,Month);
        List<DaySummary> daySummaries = new ArrayList<>();
        for(DailySum dailySum:dailySums) {
            DaySummary daySummary = new DaySummary(
                    dailySum.getDate(),
                    dailySum.getMonthlyIncome(),  // Assuming getDailyIncome() returns income of the day
                    dailySum.getMonthlyExpense()  // Assuming getDailyExpense() returns expense of the day
            );
            daySummaries.add(daySummary);
        }
    }

    private static List<Long> getAccountIdln(List<Accounts> accountsList) {
        return accountsList.stream()
                .map(Accounts::getAccountId)
                .collect(Collectors.toList());
    }

}
