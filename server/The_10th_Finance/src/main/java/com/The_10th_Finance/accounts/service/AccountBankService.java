package com.The_10th_Finance.accounts.service;

import com.The_10th_Finance.accounts.db.Accounts;
import com.The_10th_Finance.accounts.db.AccountsRepository;
import com.The_10th_Finance.accounts.model.AccountsBankResponse;
import com.The_10th_Finance.bank.service.BankService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class AccountBankService {

    private final AccountsRepository accountsRepository;
    private final BankService bankService;


    @Transactional(readOnly = true)
    public List<AccountsBankResponse> getMyAccountAndBank(Long userId) {
//            return accountsRepository.findMyAccount(userId).map(ds->accountsMapper.listAccountToListAccountResponseDto(ds)).orElseThrow(() -> new BusinessLogicException(ExceptionCode.NOSUCHFOUND));
        List<Accounts> accounts = accountsRepository.findMyAccount(userId).get();
        List<AccountsBankResponse> accountsBankRespons = new ArrayList<>();
        for (Accounts accounts1 : accounts) {
            AccountsBankResponse accountsBankResponse = AccountsBankResponse.builder().accountId(accounts1.getAccountId())
                    .accountNum(accounts1.getAccountNum())
                    .balance(accounts1.getBalance())
                    .cardNum(accounts1.getCardNum())
                    .accountStatement(accounts1.getAccountStatement())
                    .acoountType(accounts1.getAcoountType())
                    .userId(accounts1.getUserId())
                    .bankname(bankService.getOne(accounts1.getBankId()))
                    .build();
            accountsBankRespons.add(accountsBankResponse);
        }
        return accountsBankRespons;
    }


}



