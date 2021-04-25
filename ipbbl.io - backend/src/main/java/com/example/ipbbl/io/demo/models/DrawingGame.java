package com.example.ipbbl.io.demo.models;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "drawingGames")
public class DrawingGame {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int numberOfRounds;

    private int timeForDrawing;

    @OneToMany(mappedBy = "drawingRoom")
    private Set<User> users;

    @OneToMany(mappedBy = "drawingRoom")
    private Set<Word> words;

    public DrawingGame(int numberOfRounds, int timeForDrawing, List<User> users, List<Word> words) {
        this.numberOfRounds = numberOfRounds;
        this.timeForDrawing = timeForDrawing;
        this.users = (Set<User>) users;
        this.words = (Set<Word>) words;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getNumberOfRounds() {
        return numberOfRounds;
    }

    public void setNumberOfRounds(int numberOfRounds) {
        this.numberOfRounds = numberOfRounds;
    }

    public int getTimeForDrawing() {
        return timeForDrawing;
    }

    public void setTimeForDrawing(int timeForDrawing) {
        this.timeForDrawing = timeForDrawing;
    }

    public Set<User> getUsers() {
        return users;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
    }

    public Set<Word> getWords() {
        return words;
    }

    public void setWords(Set<Word> words) {
        this.words = words;
    }
}
