package com.The_10th_Finance.cashpay.db;

import com.The_10th_Finance.payment.db.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface CashPaymentRepository extends JpaRepository<CashPayment,Long> {

    @Query("SELECT " +
            "COALESCE(SUM(case when c.amount < 0 then c.amount else 0 end), 0) AS total_expenses, " +
            "COALESCE(SUM(case when c.amount > 0 then c.amount else 0 end), 0) AS total_income, " +
            "COALESCE(SUM(c.amount),0) AS total " +
            "FROM cash_payment c " +
            "WHERE MONTH(c.paymentTime) = :month " +
            "AND c.propertyId = :cashPaymentId")
    Optional<Map<String, BigDecimal>> findMonthlySummary(@Param("month") int month, @Param("cashPaymentId") Long cashPaymentId);

    @Query("SELECT " +
            "COALESCE(SUM(case when c.amount < 0 then c.amount else 0 end), 0) AS total_expenses, " +
            "COALESCE(SUM(case when c.amount > 0 then c.amount else 0 end), 0) AS total_income, " +
            "COALESCE(SUM(c.amount),0) AS total " +
            "FROM cash_payment c " +
            "WHERE MONTH(c.paymentTime) = :month " +
            "AND DAY(c.paymentTime) = :day " +
            "AND c.propertyId = :moneyId")
    Optional<Map<String, BigDecimal>> findDailyAndSum(@Param("day")int day, @Param("month")int month,@Param("moneyId") Long moneyId);

    @Query("select a from cash_payment a where month(a.paymentTime)=:month AND  day(a.paymentTime)=:day and a.propertyId=:moneyId")
    Optional<List<CashPayment>> findDaily(@Param("day")int day, @Param("month")int month,@Param("moneyId") Long moneyId);

    @Query("select a from cash_payment a where month(a.paymentTime)=:month  and a.propertyId=:moneyId")
    Optional<List<CashPayment>> findMonthly(  @Param("month")int month,@Param("moneyId") Long moneyId);

    @Query("SELECT cp.category, SUM(cp.amount) FROM cash_payment cp WHERE month(cp.paymentTime) = :month AND cp.propertyId = :moneyId GROUP BY cp.category")
    Optional<List<Object[]>> findMonthlySumByCategory( @Param("month")int month,@Param("moneyId") Long moneyId);
}
