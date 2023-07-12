package com.The_10th_Finance.main.model;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TempSummary {
    private BigDecimal total = BigDecimal.ZERO;
    private BigDecimal income=BigDecimal.ZERO;
    private BigDecimal expense=BigDecimal.ZERO;
}
