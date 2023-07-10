package com.The_10th_Finance.accounts.service;

import com.The_10th_Finance.accounts.db.Accounts;
import com.The_10th_Finance.accounts.db.AccountsRepository;
import com.The_10th_Finance.dailiysum.service.DailySumService;
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

    public Accounts post(Accounts accountsPostToAccounts) {
        accountsPostToAccounts.setAccountStatement(Accounts.AccountStatement.ACTIVE);
       return accountsRepository.save(accountsPostToAccounts);
    }

    public Accounts getOne(Long id) {
        return accountsRepository.findById(id).orElseThrow(() -> new BusinessLogicException(ExceptionCode.USERNOTFOUND));
    }

    public List<Accounts> getMyAccount(Long userId) {
        return accountsRepository.findMyAccount(userId).orElseThrow(() -> new BusinessLogicException(ExceptionCode.USERNOTFOUND));
    }


    public void deleteOne(Long id) {
        accountsRepository.deleteById(id);
    }

    public String getAccountType(Long accountId) {
        return accountsRepository.findAccountTypebyAccountId(accountId).orElseThrow(() -> new BusinessLogicException(ExceptionCode.USERNOTFOUND));
    }
}
