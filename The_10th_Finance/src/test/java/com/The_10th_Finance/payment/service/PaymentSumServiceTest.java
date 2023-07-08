package com.The_10th_Finance.payment.service;

import com.The_10th_Finance.accounts.service.AccountsService;
import com.The_10th_Finance.categorysum.service.CategorySumService;
import com.The_10th_Finance.dailiysum.service.DailySumService;
import com.The_10th_Finance.monthlysum.service.MonthlySumService;
import com.The_10th_Finance.payment.db.Payment;
import com.The_10th_Finance.dailiysum.db.DailySum;
import com.The_10th_Finance.monthlysum.db.MonthlySum;
import com.The_10th_Finance.categorysum.db.CategorySum;
import com.The_10th_Finance.payment.db.PaymentRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.MockitoJUnitRunner;
// other necessary imports

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.mockito.Mockito.times;

@RunWith(MockitoJUnitRunner.class)
public class PaymentSumServiceTest {

    @Mock
    private PaymentRepository paymentRepository;

    @Mock
    private DailySumService dailySumService;

    @Mock
    private MonthlySumService monthlySumService;

    @Mock
    private AccountsService accountsService;

    @Mock
    private CategorySumService categorySumService;

    @InjectMocks
    private PaymentSumService paymentSumService;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
    }
    @Test
    public void testPost() {
        // given
        Payment payment = new Payment();
        payment.setPaymentId(1L);
        payment.setPaymentTime(LocalDateTime.now());
        payment.setPaymentType("Credit Card");
        payment.setCounterPartyName("John Doe");
        payment.setAmount(new BigDecimal("1000"));
        payment.setPurpose("Dinner");
        payment.setCategory("Food");
        payment.setAccountId(123L);

        DailySum dailySum = new DailySum();
        // set necessary attributes to dailySum

        MonthlySum monthlySum = new MonthlySum();
        // set necessary attributes to monthlySum

        CategorySum categorySum = new CategorySum();
        // set necessary attributes to categorySum

        when(paymentRepository.save(any(Payment.class))).thenReturn(payment);
        when(dailySumService.findbyDateandId(any(), any())).thenReturn(Optional.empty());
        when(monthlySumService.findbyDateandId(anyInt(), anyInt(), any())).thenReturn(Optional.empty());
        when(categorySumService.findbyDateandId(anyInt(), anyInt(), anyString(), any())).thenReturn(Optional.empty());
        when(accountsService.getAccountType(any())).thenReturn("AccountType");

        // when
        Payment returnedPayment = paymentSumService.post(payment);

        // then
        assertEquals(returnedPayment, payment);
        verify(dailySumService, times(1)).post(any(DailySum.class));
        verify(monthlySumService, times(1)).post(any(MonthlySum.class));
        verify(categorySumService, times(1)).post(any(CategorySum.class));
    }
}