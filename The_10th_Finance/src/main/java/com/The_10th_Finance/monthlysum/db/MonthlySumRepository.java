package com.The_10th_Finance.monthlysum.db;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.Optional;

public interface MonthlySumRepository extends JpaRepository<MonthlySum,Long> {
    @Query(value = "SELECT * FROM monthly_sum WHERE YEAR(date) = :year AND MONTH(date) = :month AND account_id = :accountId", nativeQuery = true)
    Optional<MonthlySum> findDailySumByDateAndAccountId(int year, int month, Long accountId);
}
