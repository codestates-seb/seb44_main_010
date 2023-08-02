package com.The_10th_Finance.bank.db;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface BankRepository extends JpaRepository<Bank,Long> {

    @Query("select b.bankName from bank b where b.bankId=:bankId ")
    Optional<String> findBankNameByBankId(@Param("bankId") Long bankId);
}
