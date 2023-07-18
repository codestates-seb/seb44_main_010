package com.The_10th_Finance.domain.getcategorysum;

import lombok.*;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CategoryResponse {
    private Map<String, BigDecimal> categoryincomeSumsMap ;
    private Map<String, BigDecimal> categoryexpenseSumsMap ;
}
