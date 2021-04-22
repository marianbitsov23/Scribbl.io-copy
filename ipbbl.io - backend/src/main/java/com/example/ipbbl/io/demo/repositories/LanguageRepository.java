package com.example.ipbbl.io.demo.repositories;

import com.example.ipbbl.io.demo.models.ELanguage;
import com.example.ipbbl.io.demo.models.Language;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LanguageRepository extends JpaRepository<Language, Long> {
    Optional<Language> findByName (ELanguage name);
}
