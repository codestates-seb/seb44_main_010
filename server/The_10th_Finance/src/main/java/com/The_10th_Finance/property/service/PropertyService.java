package com.The_10th_Finance.property.service;

import com.The_10th_Finance.error.BusinessLogicException;
import com.The_10th_Finance.error.ExceptionCode;
import com.The_10th_Finance.property.db.Property;
import com.The_10th_Finance.property.db.PropertyRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class PropertyService {

    private final PropertyRepository propertyRepository;
    public Property post(Property property) {
       return propertyRepository.save(property);
    }

    public Property getOne(Long id) {
       return propertyRepository.findById(id).orElseThrow(() -> new BusinessLogicException(ExceptionCode.USERNOTFOUND));
    }
    public Property getByUserid(Long userid) {
        return propertyRepository.findPropertiesByUserId(userid).orElseThrow(() -> new BusinessLogicException(ExceptionCode.USERNOTFOUND));
    }
    public void deleteOne(Long id) {
        propertyRepository.deleteById(id);
    }
}
