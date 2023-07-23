package com.The_10th_Finance.domain.getmonthlysum;

import com.The_10th_Finance.property.db.Property;
import com.The_10th_Finance.user.model.UserResponseDto;
import lombok.Builder;
import lombok.Getter;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@Getter
@Builder
public class MonthlyResoponse implements Serializable {
    private UserResponseDto userResponseDto;
    private List<Property> propertyResponse;
    private MonthlyResponseDto monthlyResponseDto;
}
