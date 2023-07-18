package com.The_10th_Finance.domain.getcategorysum;

import com.The_10th_Finance.accounts.db.Accounts;
import com.The_10th_Finance.accounts.model.AccountsResponseDto;
import com.The_10th_Finance.accounts.service.AccountsService;
import com.The_10th_Finance.categorysum.db.CategorySum;
import com.The_10th_Finance.categorysum.service.CategorySumService;
import com.The_10th_Finance.dailiysum.service.DailySumService;
import com.The_10th_Finance.user.db.User;
import com.The_10th_Finance.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class AccountCategoryService {
    private final UserService userService;
    private final AccountsService accountsService;
    private final CategorySumService categorySumService;

    public  CategoryResponse getDailySum(Long userId,int month){
        User user = userService.findById(userId);
        List<AccountsResponseDto> accountsList= accountsService.getMyAccount(userId);
        List<Long> accountId = accountsList.stream()
                .map(AccountsResponseDto::getAccountId)
                .collect(Collectors.toList());
        List<CategorySum> categorySums = categorySumService.getSum(month,accountId);
        Map<String, BigDecimal> categoryincomeSumsMap = new HashMap<>();
        Map<String, BigDecimal> categoryexpenseSumsMap = new HashMap<>();
        for(CategorySum categorySum: categorySums){
            String category = categorySum.getCategory();
            BigDecimal sum = categorySum.getMonthlyTotal();
            if(category.equals("월급") || category.equals("투자") || category.equals("기타")){
                BigDecimal currentSum = categoryincomeSumsMap.getOrDefault(category, BigDecimal.ZERO);
                categoryincomeSumsMap.put(category, currentSum.add(sum));
            }else {
                BigDecimal currentSum = categoryexpenseSumsMap.getOrDefault(category, BigDecimal.ZERO);
                categoryexpenseSumsMap.put(category, currentSum.add(sum));
            }
        }

        return CategoryResponse.builder().categoryincomeSumsMap(categoryincomeSumsMap).categoryexpenseSumsMap(categoryexpenseSumsMap).build();
    }
}
