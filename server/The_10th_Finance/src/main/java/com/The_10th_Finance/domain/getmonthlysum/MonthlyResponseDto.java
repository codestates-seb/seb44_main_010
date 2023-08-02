package com.The_10th_Finance.domain.getmonthlysum;

import com.The_10th_Finance.accounts.model.AccountsBankResponse;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
@Setter
@Getter
@Builder
public class MonthlyResponseDto implements Serializable {

    private List<AccountsBankResponse> accountsList;
    private BigDecimal input;
    private BigDecimal stock;
    private  BigDecimal etc;
    private  BigDecimal total;
    private  BigDecimal prviousMinCurrent;
    private BigDecimal[] monthSum;
}
