package com.The_10th_Finance.dailiysum.db;

import com.The_10th_Finance.Sumentity;
import lombok.*;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@Entity(name = "daily_sum")
@Table(name = "daily_sum")
public class DailySum  extends Sumentity {
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

    @Column(name = "account_id", nullable = false)
    private Long accountId;

    @Column(name = "account_type", nullable = false)
    private String accountType;

    public DailySum(LocalDateTime date, BigDecimal dailyIncome, BigDecimal dailyExpense, BigDecimal dailyTotal, Long accountId,String accountType) {
        this.date = date;
        this.monthlyIncome = dailyIncome;
        this.monthlyExpense = dailyExpense;
        this.monthlyTotal = dailyTotal;
        this.accountId = accountId;
        this.accountType = accountType;
    }
}
