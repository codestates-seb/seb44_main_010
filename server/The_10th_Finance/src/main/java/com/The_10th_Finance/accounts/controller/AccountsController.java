package com.The_10th_Finance.accounts.controller;

import com.The_10th_Finance.accounts.db.Accounts;
import com.The_10th_Finance.accounts.mapper.AccountsMapper;
import com.The_10th_Finance.accounts.model.AccountsPatch;
import com.The_10th_Finance.accounts.model.AccountsPost;
import com.The_10th_Finance.accounts.service.AccountsService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/account")
public class AccountsController {
    private final AccountsService accountsService;
    private final AccountsMapper accountsMapper;

    @PostMapping("/post")
    public ResponseEntity postAccount(@Valid @RequestBody AccountsPost accountsPost){
        Accounts accounts =accountsService.post(accountsMapper.accountsPostToAccounts(accountsPost));
        return  new ResponseEntity(accountsMapper.accountsToAccountsResponseDto(accounts), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity getOne(@PathVariable(name = "id")@Positive Long id){
        Accounts accounts = accountsService.getOne(id);
        return new ResponseEntity(accountsMapper.accountsToAccountsResponseDto(accounts),HttpStatus.ACCEPTED);
    }
    //사용자 아이디를 통해서 계좌정보를 보내주는 로직
//    @GetMapping("/{userId}")
//    public ResponseEntity getMyAccount(@PathVariable(name = "userId")Long userId){
//        List<Accounts> accounts = accountsService.getMyAccount(userId);
//        return new ResponseEntity(accountsMapper.listAccountToListAccountResponseDto(accounts),HttpStatus.ACCEPTED);
//    }

    @DeleteMapping("/{id}")
    public void deleteOne(@PathVariable(name = "id") @Positive Long id){
        accountsService.deleteOne(id);
    }

    @PatchMapping("/{id}")
    public ResponseEntity patchAccount(@PathVariable(name = "id") @Positive Long id,
                                    @RequestBody AccountsPatch accountsPatch) {
        Accounts accounts = accountsService.getOne(id);
        accountsMapper.accountsToPatch(accountsPatch,accounts);
        return new ResponseEntity(accountsMapper.accountsToAccountsResponseDto(accountsService.post(accounts)),HttpStatus.ACCEPTED);
    }

}
