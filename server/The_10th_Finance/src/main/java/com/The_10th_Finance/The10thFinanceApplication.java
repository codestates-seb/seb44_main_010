package com.The_10th_Finance;

import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableJpaAuditing
@SpringBootApplication
@EnableScheduling
@EnableBatchProcessing
public class The10thFinanceApplication {

	public static void main(String[] args) {
		SpringApplication.run(The10thFinanceApplication.class, args);
	}

}
