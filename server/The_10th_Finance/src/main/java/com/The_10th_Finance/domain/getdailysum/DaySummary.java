package com.The_10th_Finance.domain.getdailysum;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DaySummary {
    private LocalDateTime date;
    private BigDecimal income=BigDecimal.ZERO;
    private BigDecimal expense=BigDecimal.ZERO;
    private BigDecimal total = BigDecimal.ZERO;

    public DaySummary(LocalDateTime date, BigDecimal income, BigDecimal expense) {
        this.date = date;
        this.income = income;
        this.expense = expense;
    }
}
