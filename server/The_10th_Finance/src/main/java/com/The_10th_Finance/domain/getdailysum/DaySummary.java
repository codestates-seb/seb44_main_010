package com.The_10th_Finance.domain.getdailysum;


import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
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
