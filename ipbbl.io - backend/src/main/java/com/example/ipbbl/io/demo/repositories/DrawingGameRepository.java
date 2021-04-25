package com.example.ipbbl.io.demo.repositories;

import com.example.ipbbl.io.demo.models.DrawingGame;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DrawingGameRepository extends JpaRepository<DrawingGame, Long> {
}
