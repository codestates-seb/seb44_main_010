//package com.The_10th_Finance.batch;
//
//import com.The_10th_Finance.payment.service.PaymentService;
//import com.The_10th_Finance.user.service.UserService;
//import lombok.RequiredArgsConstructor;
//import org.springframework.batch.core.Job;
//import org.springframework.batch.core.JobParameters;
//import org.springframework.batch.core.JobParametersBuilder;
//import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing;
//import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
//import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
//import org.springframework.batch.core.launch.JobLauncher;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.scheduling.annotation.EnableScheduling;
//import org.springframework.scheduling.annotation.Scheduled;
//import org.springframework.stereotype.Service;
//
//import java.sql.Timestamp;
//import java.time.LocalDateTime;
//import java.util.Calendar;
//import java.util.Date;
//@Configuration
//@Service
//@EnableScheduling
//public class BatchExecutor {
//
//    private final JobLauncher jobLauncher;
//    private final Job myJob;
//
//    public BatchExecutor(JobLauncher jobLauncher, Job myJob) {
//        this.jobLauncher = jobLauncher;
//        this.myJob = myJob;
//    }
//
//    @Scheduled(initialDelay = 60000 , fixedDelay = 60000)
//    public void runMyBatchJob() {
//        try {
//            JobParameters jobParameters = new JobParametersBuilder()
//                    .addLong("time", System.currentTimeMillis())
//                    .addString("jobName", "myJob")
//                    .toJobParameters();
//            jobLauncher.run(myJob, jobParameters);
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//    }
//}
//
//
//
