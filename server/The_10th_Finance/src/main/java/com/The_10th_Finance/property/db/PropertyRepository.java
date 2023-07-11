package com.The_10th_Finance.property.db;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PropertyRepository extends JpaRepository<Property, Long> {
    Optional<Property> findPropertiesByUserId(Long userId);
}
