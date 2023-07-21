package com.The_10th_Finance.domain.getcategorysum;

import com.The_10th_Finance.accounts.db.Accounts;
import com.The_10th_Finance.accounts.model.AccountsResponseDto;
import com.The_10th_Finance.accounts.service.AccountsService;
import com.The_10th_Finance.cashpay.service.CashPaymentService;
import com.The_10th_Finance.categorysum.db.CategorySum;
import com.The_10th_Finance.categorysum.service.CategorySumService;
import com.The_10th_Finance.dailiysum.service.DailySumService;
import com.The_10th_Finance.property.service.PropertyService;
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
    private final CashPaymentService cashPaymentService;
    private final PropertyService propertyService;

    public  CategoryResponse getDailySum(Long userId,int month){
        User user = userService.findById(userId);
        Long moneyId = propertyService.getMoney(userId);
        log.info("{}",moneyId);
        List<AccountsResponseDto> accountsList= accountsService.getMyAccount(1L);
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
        if(moneyId!=null) {
            List<Object[]> arr = cashPaymentService.getCategorySum(month, moneyId);
            for (Object[] obj : arr) {
                String category = String.valueOf(obj[0]);
                if (category.equals("월급") || category.equals("투자") || category.equals("기타")) {
                    BigDecimal currentSum = obj[1]!=null?(BigDecimal)obj[1]:BigDecimal.ZERO;
                    categoryincomeSumsMap.put(String.valueOf(obj[0]),categoryexpenseSumsMap.getOrDefault(obj[0], BigDecimal.ZERO).add(currentSum));
                } else {
                    BigDecimal currentSum = obj[1]!=null?(BigDecimal)obj[1]:BigDecimal.ZERO;
                    categoryexpenseSumsMap.put(String.valueOf(obj[0]), categoryexpenseSumsMap.getOrDefault(obj[0], BigDecimal.ZERO).add(currentSum));
                }
            }
        }
        return CategoryResponse.builder().categoryincomeSumsMap(categoryincomeSumsMap).categoryexpenseSumsMap(categoryexpenseSumsMap).build();
    }

}


