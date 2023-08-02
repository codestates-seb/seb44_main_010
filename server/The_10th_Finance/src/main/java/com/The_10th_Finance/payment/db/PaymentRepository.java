package com.The_10th_Finance.payment.db;

import com.The_10th_Finance.payment.model.PaymentResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface PaymentRepository extends JpaRepository<Payment,Long> {
    @Query("select p from payment p where p.accountId in :accountIds AND month(p.paymentTime)=:month")
    Optional<List<Payment>> findPaymentByAccountIdInAndMonth(@Param("accountIds")List<Long> accountIds, @Param("month")int month);



    @Query("select p from payment p where p.accountId in :accountIds AND month(p.paymentTime)=:month AND day(p.paymentTime)=:day")
    Optional<List<Payment>> findPaymentByAccountIdInAndMonthAndDate(@Param("accountIds")List<Long> accountIds, @Param("month")int month,@Param("day")int day);
}
