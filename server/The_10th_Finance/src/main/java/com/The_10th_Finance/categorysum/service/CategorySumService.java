package com.The_10th_Finance.categorysum.service;

import com.The_10th_Finance.categorysum.db.CategorySum;
import com.The_10th_Finance.categorysum.db.CategorySumRepository;
import com.The_10th_Finance.error.BusinessLogicException;
import com.The_10th_Finance.error.ExceptionCode;
import com.The_10th_Finance.monthlysum.db.MonthlySum;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor

public class CategorySumService {
    private final CategorySumRepository categorySumRepository;

    @Transactional(readOnly = true)
    public Optional<CategorySum> findbyDateandId(int year, int month , String category, Long accountId){
        return  categorySumRepository.findCategorySumByAccountIdInAndMonthAndDate(year,month,category,accountId);
    }

    @Transactional(readOnly = true)
    public List<CategorySum> getSum(int month , List<Long> accountId){
        return  categorySumRepository.findCategorySumByDateAndAccountId(accountId,month).orElseThrow(()->new BusinessLogicException(ExceptionCode.NOSUCHFOUND));
    }



    @Transactional
    public void post(CategorySum categorySum){
        categorySumRepository.save(categorySum);
    }
}
