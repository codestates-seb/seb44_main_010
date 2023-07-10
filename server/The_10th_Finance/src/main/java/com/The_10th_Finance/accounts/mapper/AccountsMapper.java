package com.The_10th_Finance.accounts.mapper;

import com.The_10th_Finance.accounts.db.Accounts;
import com.The_10th_Finance.accounts.model.AccountsPatch;
import com.The_10th_Finance.accounts.model.AccountsPost;
import com.The_10th_Finance.accounts.model.AccountsResponseDto;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = "spring")
public interface AccountsMapper {
    Accounts accountsPostToAccounts(AccountsPost accountsPostDto);

    AccountsResponseDto accountsToAccountsResponseDto(Accounts accounts);

    void accountsToPatch(AccountsPatch accountsPatch, @MappingTarget Accounts accounts);

    List<AccountsResponseDto> listAccountToListAccountResponseDto(List<Accounts> accountsList);
}
