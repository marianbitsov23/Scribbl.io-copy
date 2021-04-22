package com.example.ipbbl.io.demo.models;

import javax.persistence.*;

@Entity
@Table(name = "words")
public class Word {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @ManyToOne
    @JoinColumn(name = "language_id", referencedColumnName = "id")
    private Language language;

    public Word() {}

    public Word(String name, Language language) {
        this.name = name;
        this.language = language;
    }

    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }

    public void setName(String name) { this.name = name; }

    public Language getLanguage() { return language; }

    public void setLanguage(Language language) { this.language = language; }
}
