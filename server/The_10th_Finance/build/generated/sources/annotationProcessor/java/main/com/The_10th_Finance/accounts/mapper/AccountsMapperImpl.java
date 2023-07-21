package com.The_10th_Finance.accounts.mapper;

import com.The_10th_Finance.accounts.db.Accounts;
import com.The_10th_Finance.accounts.db.Accounts.AccountsBuilder;
import com.The_10th_Finance.accounts.model.AccountsPatch;
import com.The_10th_Finance.accounts.model.AccountsPost;
import com.The_10th_Finance.accounts.model.AccountsResponseDto;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-07-21T11:35:48+0900",
    comments = "version: 1.4.2.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-8.1.1.jar, environment: Java 17.0.5 (Amazon.com Inc.)"
)
@Component
public class AccountsMapperImpl implements AccountsMapper {

    @Override
    public Accounts accountsPostToAccounts(AccountsPost accountsPostDto) {
        if ( accountsPostDto == null ) {
            return null;
        }

        AccountsBuilder accounts = Accounts.builder();

        accounts.acoountType( accountsPostDto.getAcoountType() );
        accounts.balance( accountsPostDto.getBalance() );
        accounts.userId( accountsPostDto.getUserId() );
        accounts.bankId( accountsPostDto.getBankId() );
        accounts.accountNum( accountsPostDto.getAccountNum() );
        accounts.cardNum( accountsPostDto.getCardNum() );

        return accounts.build();
    }

    @Override
    public AccountsResponseDto accountsToAccountsResponseDto(Accounts accounts) {
        if ( accounts == null ) {
            return null;
        }

        AccountsResponseDto accountsResponseDto = new AccountsResponseDto();

        accountsResponseDto.setAccountId( accounts.getAccountId() );
        accountsResponseDto.setAcoountType( accounts.getAcoountType() );
        accountsResponseDto.setBalance( accounts.getBalance() );
        accountsResponseDto.setAccountStatement( accounts.getAccountStatement() );
        accountsResponseDto.setUserId( accounts.getUserId() );
        accountsResponseDto.setBankId( accounts.getBankId() );
        accountsResponseDto.setAccountNum( accounts.getAccountNum() );
        accountsResponseDto.setCardNum( accounts.getCardNum() );

        return accountsResponseDto;
    }

    @Override
    public void accountsToPatch(AccountsPatch accountsPatch, Accounts accounts) {
        if ( accountsPatch == null ) {
            return;
        }
    }

    @Override
    public List<AccountsResponseDto> listAccountToListAccountResponseDto(List<Accounts> accountsList) {
        if ( accountsList == null ) {
            return null;
        }

        List<AccountsResponseDto> list = new ArrayList<AccountsResponseDto>( accountsList.size() );
        for ( Accounts accounts : accountsList ) {
            list.add( accountsToAccountsResponseDto( accounts ) );
        }

        return list;
    }
}
