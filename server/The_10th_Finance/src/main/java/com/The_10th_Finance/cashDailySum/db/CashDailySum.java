package com.The_10th_Finance.cashDailySum.db;

import lombok.*;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@Entity(name = "cash_daily_sum")
@Table(name = "cash_daily_sum")
public class CashDailySum {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, unique = true)
    private Long id;

    @Column(name = "date", nullable = false)
    private LocalDateTime date;

    @Column(name = "daily_income", nullable = false)
    private BigDecimal monthlyIncome;

    @Column(name = "daily_expense", nullable = false)
    private BigDecimal monthlyExpense;

    @Column(name = "daily_total", nullable = false)
    private BigDecimal monthlyTotal;

    @Column(name = "property_id", nullable = false)
    private Long propertyId;
}
