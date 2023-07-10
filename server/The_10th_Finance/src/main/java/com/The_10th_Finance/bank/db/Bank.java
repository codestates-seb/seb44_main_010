package com.The_10th_Finance.bank.db;

import com.The_10th_Finance.accounts.db.Accounts;
import com.The_10th_Finance.user.db.User;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@Entity(name = "bank")
@Table(name = "bank")

public class Bank {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "bank_id", nullable = false, unique = true)
    private Long bankId;

    @Column(name = "bank_name", nullable = false)
    private String bankName;

    @Column(name = "bank_location", nullable = false)
    private String bankLocation;

    @Column(name = "bank_number", nullable = false)
    private String bankNumber;


}
