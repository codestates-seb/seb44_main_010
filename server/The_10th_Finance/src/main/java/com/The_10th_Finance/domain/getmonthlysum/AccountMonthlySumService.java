package com.The_10th_Finance.domain.getmonthlysum;

import com.The_10th_Finance.accounts.model.AccountsBankResponse;
import com.The_10th_Finance.accounts.service.AccountBankService;
import com.The_10th_Finance.cashpay.service.CashPaymentService;
import com.The_10th_Finance.error.BusinessLogicException;
import com.The_10th_Finance.error.ExceptionCode;
import com.The_10th_Finance.monthlysum.db.MonthlySum;
import com.The_10th_Finance.monthlysum.service.MonthlySumService;
import com.The_10th_Finance.property.db.Property;
import com.The_10th_Finance.property.service.PropertyService;
import com.The_10th_Finance.user.db.User;
import com.The_10th_Finance.user.model.UserResponseDto;
import com.The_10th_Finance.user.service.UserService;
import com.The_10th_Finance.user.usermapper.UserMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class AccountMonthlySumService {
    private final UserService userService;
    private final AccountBankService accountBankService;
    private final MonthlySumService monthlySumService;
    private final PropertyService propertyService;
    private final CashPaymentService cashPaymentService;
    private final UserMapper userMapper;


    private static List<Long> getAccountIdln(List<AccountsBankResponse> accountsList) {
        return accountsList.stream()
                .map(AccountsBankResponse::getAccountId)
                .collect(Collectors.toList());
    }
    private static Map<Long, String> getAccountIdToAccountTypeMap(List<AccountsBankResponse> accountsList) {
        return accountsList.stream()
                .collect(Collectors.toMap(AccountsBankResponse::getAccountId, AccountsBankResponse::getAcoountType));
    }
    private static BigDecimal getMonthlySum(Map<Long, String> accountsList,List<MonthlySum> monthlySums, BigDecimal[] currentMonthsum, BigDecimal[] previousMonthSum,int currentMonth,BigDecimal[] MonthSum) {
        BigDecimal currentTotal=BigDecimal.ZERO,previousTotal=BigDecimal.ZERO,currentIncome=BigDecimal.ZERO,currentExpense=BigDecimal.ZERO;
        for (MonthlySum monthlySum : monthlySums) {
            String accountType = accountsList.get(monthlySum.getAccountId());
            int month = monthlySum.getDate().getMonthValue();

            // Current month
            if(month == currentMonth) {
                MonthSum[2]=MonthSum[2].add(monthlySum.getMonthlyTotal());
                MonthSum[0]=MonthSum[0].add(monthlySum.getMonthlyIncome());
                MonthSum[1]=MonthSum[1].add(monthlySum.getMonthlyExpense());
                if (accountType.equals("입출금")) currentMonthsum[0] = currentMonthsum[0].add(monthlySum.getMonthlyTotal());
                else if (accountType.equals("증권")) currentMonthsum[1] = currentMonthsum[1].add(monthlySum.getMonthlyTotal());
                else if (accountType.equals("현금")) currentMonthsum[2] = currentMonthsum[2].add(monthlySum.getMonthlyTotal());
                else throw new BusinessLogicException(ExceptionCode.NOTYPE);
            }
            // Previous month
            else {
                previousTotal = previousTotal.add(monthlySum.getMonthlyTotal());
                if (accountType.equals("입출금")) previousMonthSum[0] = previousMonthSum[0].add(monthlySum.getMonthlyTotal());
                else if (accountType.equals("증권")) previousMonthSum[1] = previousMonthSum[1].add(monthlySum.getMonthlyTotal());
                else if (accountType.equals("현금")) previousMonthSum[2] = previousMonthSum[2].add(monthlySum.getMonthlyTotal());
                else throw new BusinessLogicException(ExceptionCode.NOTYPE);
            }
        }
        return previousTotal;
    }
//    private static void getMonthlySum(List<MonthlySum> monthlySums, BigDecimal[] currentMonthTypes, BigDecimal[] previousMonthTypes,int currentMonth,MonthSummary monthSummary) {
//        for (MonthlySum monthlySum : monthlySums) {
//            TempSummary tempSummary = new TempSummary();
//            String accountType = monthlySum.getAccountType();
//            int month = monthlySum.getDate().getMonthValue();
//            BigDecimal current_total=BigDecimal.ZERO,previous_total=BigDecimal.ZERO,incom=BigDecimal.ZERO,exponse=BigDecimal.ZERO;
//            // Current month
//            if(month == currentMonth) {
//                current_total=current_total.add(monthlySum.getMonthlyTotal());
//                incom=incom.add(monthlySum.getMonthlyIncome());
//                exponse = exponse.add(monthlySum.getMonthlyExpense());
//                if (accountType.equals("입출금")) currentMonthTypes[0] = currentMonthTypes[0].add(monthlySum.getMonthlyTotal());
//                else if (accountType.equals("증권")) currentMonthTypes[1] = currentMonthTypes[1].add(monthlySum.getMonthlyTotal());
//                else if (accountType.equals("현금")) currentMonthTypes[2] = currentMonthTypes[2].add(monthlySum.getMonthlyTotal());
//                else throw new BusinessLogicException(ExceptionCode.NOTYPE);
//            }
//            // Previous month
//            else {
//                previous_total=current_total.add(monthlySum.getMonthlyTotal());
//                if (accountType.equals("입출금")) previousMonthTypes[0] = previousMonthTypes[0].add(monthlySum.getMonthlyTotal());
//                else if (accountType.equals("증권")) previousMonthTypes[1] = previousMonthTypes[1].add(monthlySum.getMonthlyTotal());
//                else if (accountType.equals("현금")) previousMonthTypes[2] = previousMonthTypes[2].add(monthlySum.getMonthlyTotal());
//                else throw new BusinessLogicException(ExceptionCode.NOTYPE);
//            }
//            TempSummary.builder().expense(exponse).income(incom).total(current_total.subtract(previous_total));
//        }
//    }

    @Transactional
    public MonthlyResoponse getMonthlySum(Long userId,int month) {
        //*MonthlyType이란 클래스를 만들어서 추후 리펙토링 예정*

        //user에 대한 정보 가져오기
        User user = userService.findById(userId);
        log.info("{}",user.getName());
        //보안상 문제가되는 것 빼고 변환해서
        UserResponseDto userResponseDto = userMapper.userToUserResponseDto(user);

        //부동산, 차들 가져오기
        List<Property> property = propertyService.getByUserid(userId);
        BigDecimal etc = BigDecimal.ZERO;
        BigDecimal sum = BigDecimal.ZERO;

        if(property!=null){
            for(Property property1:property) {
                etc = etc.add(property1.getAmount());
            }
        }

        MonthlyResponseDto monthlyResponseDto = makeCacheData(userId,month);
        monthlyResponseDto.setEtc(etc);
        monthlyResponseDto.setTotal(monthlyResponseDto.getTotal().add(etc));
        
        return MonthlyResoponse.builder()
                .userResponseDto(userResponseDto)
                .propertyResponse(property)
                .monthlyResponseDto(monthlyResponseDto)
                .build();
    }


    public MonthlyResponseDto makeCacheData(Long userId,int month){
        Long moneyId = propertyService.getMoney(userId);
        Map<String, BigDecimal> map = new HashMap<>();
        if(moneyId!=null){
             map= cashPaymentService.getMonthSum(month,moneyId);
        }
        List<AccountsBankResponse> accountsList = accountBankService.getMyAccountAndBank(1L);
        Map<Long,String> mapping = getAccountIdToAccountTypeMap(accountsList);
        //계좌ID를 리스트화하기
        List<Long> accountId = getAccountIdln(accountsList);

        //계좌ID랑 메핑되는 MonthlySum가져오기
//        List<MonthlySum> monthlySums = monthlySumService.getMonthlySumList(accountId);
        List<MonthlySum> monthlySums = monthlySumService.getMonthlySumListbyMonth(accountId, month);

        //Type에 맞게 분류해서 한달 총합 계산하기
        BigDecimal[] currentMonthTypes = {BigDecimal.ZERO, BigDecimal.ZERO, BigDecimal.ZERO};
        BigDecimal[] previousMonthTypes = {BigDecimal.ZERO, BigDecimal.ZERO, BigDecimal.ZERO};
        BigDecimal[] MonthSum = {BigDecimal.ZERO, BigDecimal.ZERO, BigDecimal.ZERO};
        BigDecimal previous = getMonthlySum(mapping,monthlySums, currentMonthTypes,previousMonthTypes,month,MonthSum);
        MonthSum[0]=MonthSum[0].add(map.get("total_income")!=null?map.get("total_income"):BigDecimal.ZERO);
        MonthSum[1]=MonthSum[1].add(map.get("total_expenses")!=null?map.get("total_expenses"):BigDecimal.ZERO);
        MonthSum[2]=MonthSum[2].add(map.get("total")!=null?map.get("total"):BigDecimal.ZERO);
        BigDecimal A = new BigDecimal("30000000.00");
        BigDecimal B = new BigDecimal("10000000.00");
        BigDecimal sum = A.add(B);
        return MonthlyResponseDto.builder()
                .accountsList(accountsList)
                .input(A)
                .stock(B)
                .total(sum)
                .prviousMinCurrent(previous)
                .monthSum(MonthSum)
                .build();
    }
}
