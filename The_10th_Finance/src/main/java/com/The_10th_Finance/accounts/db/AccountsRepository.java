package com.The_10th_Finance.accounts.db;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface AccountsRepository extends JpaRepository<Accounts,Long> {
    @Query("SELECT a FROM account a where a.accountId =:userId")
    Optional<List<Accounts>> findMyAccount(@Param("userId") Long userId);

    @Query("select a.acoountType FROM account a where a.accountId =:accountId")
   Optional<String> findAccountTypebyAccountId(@Param("accountId") Long accountId);


}
