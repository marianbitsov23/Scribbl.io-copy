package com.example.ipbbl.io.demo.controllers;

import com.example.ipbbl.io.demo.models.ELanguage;
import com.example.ipbbl.io.demo.models.Language;
import com.example.ipbbl.io.demo.payload.LanguageRequest;
import com.example.ipbbl.io.demo.repositories.LanguageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("api/language")
public class LanguageController {
    @Autowired
    LanguageRepository languageRepository;

    @PostMapping
    private ResponseEntity<?> createNewLanguage(@RequestBody LanguageRequest languageRequest) {
        Language language = new Language(ELanguage.valueOf(languageRequest.getName().toUpperCase()));

        return new ResponseEntity<>(languageRepository.save(language), HttpStatus.OK);
    }

    @GetMapping
    private ResponseEntity<?> getAllLanguages() {
        return new ResponseEntity<>(languageRepository.findAll(), HttpStatus.OK);
    }
}
