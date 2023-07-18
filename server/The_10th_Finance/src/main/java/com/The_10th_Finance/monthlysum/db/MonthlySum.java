package com.The_10th_Finance.monthlysum.db;

import com.The_10th_Finance.domain.paymenttransaction.Sumentity;
import lombok.*;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@Entity(name = "monthly_sum")
@Table(name = "monthly_sum")
public class MonthlySum extends Sumentity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, unique = true)
    private Long id;

    @Column(name = "date", nullable = false)
    private LocalDateTime date;

    @Column(name = "monthly_income", nullable = false)
    private BigDecimal monthlyIncome;

    @Column(name = "monthly_expense", nullable = false)
    private BigDecimal monthlyExpense;

    @Column(name = "monthly_total", nullable = false)
    private BigDecimal monthlyTotal;

    @Column(name = "account_id", nullable = false)
    private Long accountId;


    public MonthlySum(LocalDateTime date, BigDecimal monthlyIncome, BigDecimal monthlyExpense, BigDecimal monthlyTotal, Long accountId) {
        this.date = date;
        this.monthlyIncome = monthlyIncome;
        this.monthlyExpense = monthlyExpense;
        this.monthlyTotal = monthlyTotal;
        this.accountId = accountId;
    }
}
