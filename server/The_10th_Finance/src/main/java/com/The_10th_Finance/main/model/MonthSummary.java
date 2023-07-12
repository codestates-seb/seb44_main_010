package com.The_10th_Finance.main.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MonthSummary {
    private BigDecimal income=BigDecimal.ZERO;
    private BigDecimal expense=BigDecimal.ZERO;
}
