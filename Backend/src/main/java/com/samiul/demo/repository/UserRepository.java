package com.samiul.demo.repository;

import com.samiul.demo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsernameAndPassword(String username, String password);

    Optional<User> findByEmail(String email);

    Optional<User> findByUsernameAndMobileNo(String username, String mobileNo);
    Optional<User> findByUsername(String userName);

}



//