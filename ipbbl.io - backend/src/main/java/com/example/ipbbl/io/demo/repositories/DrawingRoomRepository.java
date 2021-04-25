package com.example.ipbbl.io.demo.repositories;

import com.example.ipbbl.io.demo.models.DrawingRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DrawingRoomRepository extends JpaRepository<DrawingRoom, Long> {
    Optional<DrawingRoom> findByUrl(String url);

    Optional<List<DrawingRoom>> findAllByNumberOfRounds(int numberOfRounds);
}
