package com.The_10th_Finance.categorysum.db;

import com.The_10th_Finance.monthlysum.db.MonthlySum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface CategorySumRepository extends JpaRepository<CategorySum,Long> {

    @Query(value = "SELECT * FROM category_sum WHERE YEAR(monthly) = :year AND MONTH(monthly) = :month AND category = :category  AND account_id = :accountId", nativeQuery = true)
    Optional<CategorySum> findDailySumByDateAndAccountId(int year, int month,String category, Long accountId);
}
