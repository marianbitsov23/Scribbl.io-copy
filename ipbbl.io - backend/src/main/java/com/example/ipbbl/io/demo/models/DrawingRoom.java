package com.example.ipbbl.io.demo.models;

import javax.persistence.*;

@Entity
@Table(name = "drawing_rooms")
public class DrawingRoom {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String url;

    private int timeForDrawing;

    private int numberOfRounds;

    private String creatorUsername;

    @ManyToOne
    @JoinColumn(name = "language_id", referencedColumnName = "id")
    private Language language;

    public DrawingRoom() {}

    public DrawingRoom(String url, int timeForDrawing, int numberOfRounds, String creatorUsername, Language language) {
        this.url = url;
        this.timeForDrawing = timeForDrawing;
        this.numberOfRounds = numberOfRounds;
        this.creatorUsername = creatorUsername;
        this.language = language;
    }

    public DrawingRoom(String url, int timeForDrawing, int numberOfRounds, String creatorUsername) {
        this.url = url;
        this.timeForDrawing = timeForDrawing;
        this.numberOfRounds = numberOfRounds;
        this.creatorUsername = creatorUsername;
    }


    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public String getUrl() { return url; }

    public void setUrl(String url) { this.url = url; }

    public int getTimeForDrawing() { return timeForDrawing; }

    public void setTimeForDrawing(int timeForDrawing) { this.timeForDrawing = timeForDrawing; }

    public int getNumberOfRounds() { return numberOfRounds; }

    public void setNumberOfRounds(int numberOfRounds) { this.numberOfRounds = numberOfRounds; }

    public String getCreatorUsername() { return creatorUsername; }

    public void setCreatorUsername(String creatorUsername) { this.creatorUsername = creatorUsername; }

    public Language getLanguage() { return language; }

    public void setLanguage(Language language) { this.language = language; }
}