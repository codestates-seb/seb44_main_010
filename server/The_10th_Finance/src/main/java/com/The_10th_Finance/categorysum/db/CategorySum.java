package com.The_10th_Finance.categorysum.db;

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
@Entity(name = "category_sum")
@Table(name = "category_sum")
public class CategorySum extends Sumentity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, unique = true)
    private Long id;

    @Column(name = "category", nullable = false)
    private String category;

    @Column(name = "monthly", nullable = false)
    private LocalDateTime monthly;

    @Column(name = "monthly_income", nullable = false)
    private BigDecimal monthlyIncome;

    @Column(name = "monthly_expense", nullable = false)
    private BigDecimal monthlyExpense;

    @Column(name = "monthly_total", nullable = false)
    private BigDecimal monthlyTotal;

    @Column(name = "account_id", nullable = false)
    private Long accountId;


    public CategorySum(String category, LocalDateTime month, BigDecimal monthlyIncome, BigDecimal monthlyExpense, BigDecimal monthlyTotal, Long accountId) {
        this.category = category;
        this.monthly = month;
        this.monthlyIncome = monthlyIncome;
        this.monthlyExpense = monthlyExpense;
        this.monthlyTotal = monthlyTotal;
        this.accountId = accountId;

    }
}
