package com.The_10th_Finance.property.model;

import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PropertyResponse {
    private Long propertyId;

    private String title;

    private String content;

    private BigDecimal amount;

    private String propertyType;

    private Long userId;

}
