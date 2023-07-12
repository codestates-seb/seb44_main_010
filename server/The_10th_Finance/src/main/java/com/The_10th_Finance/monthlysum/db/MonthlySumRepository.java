package com.The_10th_Finance.monthlysum.db;

import com.The_10th_Finance.dailiysum.db.DailySum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface MonthlySumRepository extends JpaRepository<MonthlySum,Long> {
    @Query(value = "SELECT * FROM monthly_sum WHERE YEAR(date) = :year AND MONTH(date) = :month AND account_id = :accountId", nativeQuery = true)
    Optional<MonthlySum> findDailySumByDateAndAccountId(int year, int month, Long accountId);


    Optional<List<MonthlySum>> findDailySumByAccountIdIn(List<Long> accountId);


    @Query("SELECT ms FROM monthly_sum ms WHERE ms.accountId IN :accountIds AND MONTH(ms.date) IN :months ORDER BY ms.date DESC")
    Optional<List<MonthlySum>> findMonthlySumByAccountIdInAndMonthInOrderByDateDesc(@Param("accountIds") List<Long> accountIds, @Param("months") List<Integer> months);
}
