package com.The_10th_Finance.accounts.service;

import com.The_10th_Finance.accounts.db.Accounts;
import com.The_10th_Finance.dailiysum.db.DailySum;
import com.The_10th_Finance.dailiysum.service.DailySumService;
import com.The_10th_Finance.error.BusinessLogicException;
import com.The_10th_Finance.error.ExceptionCode;
import com.The_10th_Finance.monthlysum.service.MonthlySumService;
import com.The_10th_Finance.user.db.User;
import com.The_10th_Finance.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class AccountDailyService {
    private final UserService userService;
    private final AccountsService accountsService;
    private final DailySumService dailySumService;

    public void getDailySum(Long userId){
        User user = userService.findById(userId);
        List<Accounts> accountsList= accountsService.getMyAccount(userId);
        List<Long> accountId = accountsList.stream()
                .map(Accounts::getAccountId)
                .collect(Collectors.toList());
        List<DailySum> dailySums = dailySumService.getDailySumList(accountId).orElseThrow(()->new BusinessLogicException(ExceptionCode.USERNOTFOUND));

    }

}
