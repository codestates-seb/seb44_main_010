package com.The_10th_Finance.accounts.service;

import com.The_10th_Finance.accounts.db.Accounts;
import com.The_10th_Finance.accounts.db.AccountsRepository;
import com.The_10th_Finance.accounts.mapper.AccountsMapper;
import com.The_10th_Finance.accounts.model.AccountsResponseDto;
import org.springframework.transaction.annotation.Transactional;
import com.The_10th_Finance.error.BusinessLogicException;
import com.The_10th_Finance.error.ExceptionCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;


import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor

public class AccountsService {
    private final AccountsRepository accountsRepository;
    private final AccountsMapper accountsMapper;

    @Transactional
    public Accounts post(Accounts accountsPostToAccounts) {
        accountsPostToAccounts.setAccountStatement(Accounts.AccountStatement.ACTIVE);
       return accountsRepository.save(accountsPostToAccounts);
    }

    @Transactional(readOnly = true)
    public Accounts getOne(Long id) {
        return accountsRepository.findById(id).orElseThrow(() -> new BusinessLogicException(ExceptionCode.NOSUCHFOUND));
    }
    @Transactional(readOnly = true)
    public List<AccountsResponseDto> getMyAccount(Long userId) {
        return accountsRepository.findMyAccount(userId).map(ds->accountsMapper.listAccountToListAccountResponseDto(ds)).orElseThrow(() -> new BusinessLogicException(ExceptionCode.NOSUCHFOUND));
    }

    @Transactional
    public void deleteOne(Long id) {
        accountsRepository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public String getAccountType(Long accountId) {
        return accountsRepository.findAccountTypebyAccountId(accountId).orElseThrow(() -> new BusinessLogicException(ExceptionCode.NOSUCHFOUND));
    }
}
