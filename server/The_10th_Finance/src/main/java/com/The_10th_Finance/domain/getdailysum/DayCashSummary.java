package com.The_10th_Finance.domain.getdailysum;

import com.The_10th_Finance.cashDailySum.db.CashDailySum;
import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DayCashSummary {
    private List<DaySummary> daySummaries;
    private List<CashDailySum> cashDailySums;
}
