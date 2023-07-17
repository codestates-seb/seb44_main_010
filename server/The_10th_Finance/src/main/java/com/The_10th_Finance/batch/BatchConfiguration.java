//package com.The_10th_Finance.batch;
//
//import com.The_10th_Finance.payment.db.Payment;
//import com.The_10th_Finance.payment.service.PaymentService;
//import com.The_10th_Finance.user.db.User;
//import com.The_10th_Finance.user.service.UserService;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.batch.core.Job;
//import org.springframework.batch.core.Step;
//import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing;
//import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
//import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
//import org.springframework.batch.core.launch.support.RunIdIncrementer;
//import org.springframework.batch.item.ItemProcessor;
//import org.springframework.batch.item.ItemReader;
//import org.springframework.batch.item.ItemWriter;
//import org.springframework.batch.item.support.IteratorItemReader;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.data.web.PageableDefault;
//
//import java.math.BigDecimal;
//import java.time.LocalDateTime;
//import java.util.ArrayList;
//import java.util.List;
//import java.util.concurrent.atomic.AtomicBoolean;
//
//@Configuration
//@EnableBatchProcessing
//@Slf4j
//public class BatchConfiguration {
//
//    private final JobBuilderFactory jobBuilderFactory;
//    private final StepBuilderFactory stepBuilderFactory;
//    private final UserService userService;
//    private final PaymentService paymentService;
//
//    public BatchConfiguration(JobBuilderFactory jobBuilderFactory, StepBuilderFactory stepBuilderFactory, UserService userService, PaymentService paymentService) {
//        this.jobBuilderFactory = jobBuilderFactory;
//        this.stepBuilderFactory = stepBuilderFactory;
//        this.userService = userService;
//        this.paymentService = paymentService;
//    }
//
//    @Bean
//    public ItemReader<User> reader() {
//        return ()->  userService.findById(1L);
//    }
//
//    @Bean
//    public ItemProcessor<User, Payment> processor() {
//        // User를 받아서 PaymentList를 만드는 로직
//        return user -> {
//            Payment payment = Payment.builder()
//                    .paymentTime(LocalDateTime.now())
//                    .paymentType("입금")
//                    .counterPartyName("John Doe")
//                    .amount(new BigDecimal("1500.00"))
//                    .purpose("Salary")
//                    .category("치약")
//                    .accountId(user.getId())
//                    .build();
//            return payment;
//        };
//    }
//
//    @Bean
//    public ItemWriter<Payment> writer() {
//        return payments -> {
//            log.info("{}",payments.size());
//            for (Payment payment : payments) {
//                paymentService.post(payment);
//            }
//        };
//    }
//
//
//    @Bean
//    public Step myStep(ItemReader<User> reader, ItemProcessor<User, Payment> processor, ItemWriter<Payment> writer) {
//        return stepBuilderFactory.get("myStep")
//                .<User, Payment>chunk(1)
//                .reader(reader)
//                .processor(processor)
//                .writer(writer)
//                .build();
//    }
//
//    @Bean
//    public Job myJob(Step myStep) {
//        return jobBuilderFactory.get("myJob")
//                .incrementer(new RunIdIncrementer())
//                .flow(myStep)
//                .end()
//                .build();
//    }
//}