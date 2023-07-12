package com.The_10th_Finance.property.model;

import lombok.Getter;

import javax.validation.constraints.Pattern;
import javax.validation.constraints.Positive;
import java.math.BigDecimal;

@Getter
public class PropertyPost {


    private String title;

    private String content;


    private BigDecimal amount;

    @Pattern(regexp = "차|현금|부동산")
    private String propertyType;

    @Positive
    private Long userId;
}
