package com.The_10th_Finance.categorysum.db;

import com.The_10th_Finance.dailiysum.db.DailySum;
import com.The_10th_Finance.monthlysum.db.MonthlySum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CategorySumRepository extends JpaRepository<CategorySum,Long> {

    @Query(value = "SELECT * FROM category_sum WHERE YEAR(monthly) = :year AND MONTH(monthly) = :month AND category = :category  AND account_id = :accountId", nativeQuery = true)
    Optional<CategorySum> findCategorySumByAccountIdInAndMonthAndDate(int year, int month,String category, Long accountId);

    @Query("select c from category_sum c where c.accountId IN :accountIds AND month(c.monthly)=:month")
    Optional<List<CategorySum>> findCategorySumByDateAndAccountId(@Param("accountIds")List<Long> accountIds, @Param("month") int month);
}
