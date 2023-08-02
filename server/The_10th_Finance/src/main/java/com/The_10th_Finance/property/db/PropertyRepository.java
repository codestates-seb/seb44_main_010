package com.The_10th_Finance.property.db;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface PropertyRepository extends JpaRepository<Property, Long> {
    Optional<List<Property>> findPropertiesByUserId(Long userId);

    @Query("SELECT a.propertyId FROM property a WHERE a.userId=:userId AND a.propertyType = :propertyType")
    Optional<Long> findPropertiesByPropertyType(@Param("propertyType") String propertyType,@Param("userId") Long userId);
}
