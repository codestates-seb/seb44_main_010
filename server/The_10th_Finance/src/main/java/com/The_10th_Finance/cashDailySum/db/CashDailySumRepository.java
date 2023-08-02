package com.The_10th_Finance.cashDailySum.db;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CashDailySumRepository extends JpaRepository<CashDailySum,Long> {
    @Query("select a from cash_daily_sum a where a.propertyId=:propertyId")
    Optional<CashDailySum> findDailySumByPropertyId(@Param("propertyId") Long propertyId);

    @Query("select a from cash_daily_sum a where a.propertyId=:propertyId and month(a.date)=:month")
    Optional<List<CashDailySum>> findDailySumByPropertyIdMonth(@Param("propertyId") Long propertyId, @Param("month") int month);
    @Query("select a from cash_daily_sum a where a.propertyId=:propertyId and month(a.date)=:month and day(a.date)=:dayOfMonth")
    Optional<CashDailySum> findDailySumByPropertyIdMonthAndMonth(@Param("propertyId") Long propertyId, @Param("month") int month,@Param("dayOfMonth") int dayOfMonth);
}
