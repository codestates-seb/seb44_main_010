package com.The_10th_Finance;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import java.math.BigDecimal;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public abstract class Sumentity {

    private BigDecimal monthlyIncome;

    private BigDecimal monthlyExpense;

    private BigDecimal monthlyTotal;
}
