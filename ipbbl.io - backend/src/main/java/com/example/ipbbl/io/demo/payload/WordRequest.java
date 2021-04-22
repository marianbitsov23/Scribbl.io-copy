package com.example.ipbbl.io.demo.payload;

import com.example.ipbbl.io.demo.models.Language;

public class WordRequest {
    private String name;

    private Language language;

    public WordRequest(String name, Language language) {
        this.name = name;
        this.language = language;
    }

    public String getName() { return name; }

    public void setName(String name) { this.name = name; }

    public Language getLanguage() { return language; }

    public void setLanguage(Language language) { this.language = language; }
}
