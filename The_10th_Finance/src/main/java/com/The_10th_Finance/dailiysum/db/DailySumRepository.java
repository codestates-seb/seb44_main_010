package com.The_10th_Finance.dailiysum.db;

import com.The_10th_Finance.dailiysum.db.DailySum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface DailySumRepository extends JpaRepository<DailySum,Long> {
    Optional<DailySum> findDailySumByDateAndAccountId(LocalDateTime localDateTime, Long accountId);

    Optional<List<DailySum>> findDailySumByAccountIdIn(List<Long> accountId);

    @Query("select d from daily_sum d where d.accountId=:accountIds AND month(d.date)=:month")
    Optional<List<DailySum>> findDailySumByAccountIdInAndMonth(@Param("accountIds") List<Long> accountIds, @Param("month") int month);
}
