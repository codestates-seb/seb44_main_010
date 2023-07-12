package com.The_10th_Finance.bank.model;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BanckResponse {
    private Long bankId;

    private String bankName;

    private String bankLocation;

    private String bankNumber;

}
