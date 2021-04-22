package com.example.ipbbl.io.demo.models;

import com.example.ipbbl.io.demo.models.User;
import com.example.ipbbl.io.demo.models.Word;

import java.io.Serializable;
import java.util.List;

public class GameState extends ChatMessage{
    private List<User> users;

    private int timeForDrawing;

    private int numberOfRounds;

    private List<Word> words;

    public GameState(){
        super();
    }

    public GameState(String content, User sender, MessageType type) {
        super(content, sender, type);
    }

    public GameState(MessageType type, List<User> users, int timeForDrawing, int numberOfRounds, List<Word> words) {
        super(type);
        this.users = users;
        this.timeForDrawing = timeForDrawing;
        this.numberOfRounds = numberOfRounds;
        this.words = words;
    }

    public void setUsers(List<User> users) { this.users = users; }

    public void setTimeForDrawing(int timeForDrawing) { this.timeForDrawing = timeForDrawing; }

    public void setNumberOfRounds(int numberOfRounds) { this.numberOfRounds = numberOfRounds; }

    public void setWords(List<Word> words) { this.words = words; }

    public List<User> getUsers() { return users; }

    public int getTimeForDrawing() { return timeForDrawing; }

    public int getNumberOfRounds() { return numberOfRounds; }

    public List<Word> getWords() { return words; }
}
