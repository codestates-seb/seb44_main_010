package com.The_10th_Finance.dailiysum.db;

import com.The_10th_Finance.dailiysum.db.DailySum;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface DailySumRepository extends JpaRepository<DailySum,Long> {
    Optional<DailySum> findDailySumByDateAndAccountId(LocalDateTime localDateTime, Long accountId);

    Optional<List<DailySum>> findDailySumByAccountIds(List<Long> accountId);
}
