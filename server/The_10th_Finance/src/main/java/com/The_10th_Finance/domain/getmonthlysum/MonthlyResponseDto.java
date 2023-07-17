package com.The_10th_Finance.domain.getmonthlysum;

import com.The_10th_Finance.accounts.db.Accounts;
import com.The_10th_Finance.accounts.model.AccountsResponseDto;
import com.The_10th_Finance.property.db.Property;
import com.The_10th_Finance.property.model.PropertyResponse;
import com.The_10th_Finance.user.model.UserResponseDto;
import lombok.Builder;
import lombok.Getter;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.List;
@Getter
@Builder
public class MonthlyResponseDto implements Serializable {

    private List<AccountsResponseDto> accountsList;
    private BigDecimal inputAccount;
    private BigDecimal jungunAccount;
    private  BigDecimal aashAccount;
    private  BigDecimal prviousMinCurrent;
}
