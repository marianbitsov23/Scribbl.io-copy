package com.example.ipbbl.io.demo.repositories;

import com.example.ipbbl.io.demo.models.Word;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface WordRepository extends JpaRepository<Word, Long> {
    Optional<List<Word>> findAllByLanguage_Id(Long languageId);
}
