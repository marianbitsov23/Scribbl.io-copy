package com.example.ipbbl.io.demo.models;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "languages")
public class Language {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private ELanguage name;

    @OneToMany(mappedBy = "language", cascade = CascadeType.ALL)
    Set<DrawingRoom> drawingRooms = new HashSet<>();

    public Language() {}

    public Language(ELanguage name) { this.name = name; }

    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public ELanguage getName() { return name; }

    public void setName(ELanguage name) { this.name = name; }
}
