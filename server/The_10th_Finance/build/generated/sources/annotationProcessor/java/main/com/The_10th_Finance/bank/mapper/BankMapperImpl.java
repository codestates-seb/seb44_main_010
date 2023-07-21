package com.The_10th_Finance.bank.mapper;

import com.The_10th_Finance.bank.db.Bank;
import com.The_10th_Finance.bank.db.Bank.BankBuilder;
import com.The_10th_Finance.bank.model.BanckResponse;
import com.The_10th_Finance.bank.model.BankPost;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-07-21T11:35:48+0900",
    comments = "version: 1.4.2.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-8.1.1.jar, environment: Java 17.0.5 (Amazon.com Inc.)"
)
@Component
public class BankMapperImpl implements BankMapper {

    @Override
    public Bank bankPostDtoToBank(BankPost bankPost) {
        if ( bankPost == null ) {
            return null;
        }

        BankBuilder bank = Bank.builder();

        bank.bankName( bankPost.getBankName() );
        bank.bankLocation( bankPost.getBankLocation() );
        bank.bankNumber( bankPost.getBankNumber() );

        return bank.build();
    }

    @Override
    public BanckResponse bankToBankResponse(Bank bank) {
        if ( bank == null ) {
            return null;
        }

        BanckResponse banckResponse = new BanckResponse();

        banckResponse.setBankId( bank.getBankId() );
        banckResponse.setBankName( bank.getBankName() );
        banckResponse.setBankLocation( bank.getBankLocation() );
        banckResponse.setBankNumber( bank.getBankNumber() );

        return banckResponse;
    }
}
