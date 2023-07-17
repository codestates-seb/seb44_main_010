package com.The_10th_Finance.user.db;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User , Long> {
    Optional<User> findByEmail(String email);

    @Override
    Page<User> findAll(Pageable pageable);

    @Query("select u from users u where u.userId=:userid")
    Optional<User> findByUserId(@Param("userid")Long userid);
}
