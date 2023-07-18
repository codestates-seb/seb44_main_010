package com.The_10th_Finance.domain.getmonthlysum;

import com.The_10th_Finance.accounts.model.AccountsBankResponse;
import lombok.Builder;
import lombok.Getter;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.List;
@Getter
@Builder
public class MonthlyResponseDto implements Serializable {

    private List<AccountsBankResponse> accountsList;
    private BigDecimal inputAccount;
    private BigDecimal jungunAccount;
    private  BigDecimal aashAccount;
    private  BigDecimal prviousMinCurrent;
    private BigDecimal[] monthSum;
}
