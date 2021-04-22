package com.example.ipbbl.io.demo.controllers;

import com.example.ipbbl.io.demo.models.Word;
import com.example.ipbbl.io.demo.payload.WordRequest;
import com.example.ipbbl.io.demo.repositories.WordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("api/word")
public class WordController {
    @Autowired
    WordRepository wordRepository;

    @PostMapping
    private ResponseEntity<?> createNewWord(@RequestBody WordRequest wordRequest) {
        Word newWord = new Word(
                wordRequest.getName(),
                wordRequest.getLanguage()
        );

        return new ResponseEntity<>(wordRepository.save(newWord), HttpStatus.OK);
    }

    @GetMapping("/all/{languageId}")
    private ResponseEntity<?> getAllWordsByLanguageId(@PathVariable Long languageId) {
        Optional<List<Word>> foundWords = wordRepository.findAllByLanguage_Id(languageId);
        if(foundWords.isPresent()) {
            return new ResponseEntity<>(foundWords.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
