package com.example.ipbbl.io.demo.repositories;

import com.example.ipbbl.io.demo.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
