package com.The_10th_Finance.main.service;

import com.The_10th_Finance.accounts.db.Accounts;
import com.The_10th_Finance.accounts.service.AccountsService;
import com.The_10th_Finance.categorysum.service.CategorySumService;
import com.The_10th_Finance.dailiysum.service.DailySumService;
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
public class AccountCategoryService {
    private final UserService userService;
    private final AccountsService accountsService;
    private final CategorySumService categorySumService;

    public void getDailySum(Long userId){
        User user = userService.findById(userId);
        List<Accounts> accountsList= accountsService.getMyAccount(userId);
        List<Long> accountId = accountsList.stream()
                .map(Accounts::getAccountId)
                .collect(Collectors.toList());
//        List<DailySum> dailySums = dailySumService.getDailySumList(accountId).orElseThrow(()->new BusinessLogicException(ExceptionCode.USERNOTFOUND));

    }
}
