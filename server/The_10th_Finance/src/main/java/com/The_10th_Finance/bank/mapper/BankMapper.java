package com.The_10th_Finance.bank.mapper;

import com.The_10th_Finance.bank.db.Bank;
import com.The_10th_Finance.bank.model.BanckResponse;
import com.The_10th_Finance.bank.model.BankPost;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface BankMapper {
    Bank bankPostDtoToBank(BankPost bankPost);

    BanckResponse bankToBankResponse(Bank bank);
}
