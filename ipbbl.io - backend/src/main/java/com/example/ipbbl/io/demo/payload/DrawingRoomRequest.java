package com.example.ipbbl.io.demo.payload;

import com.example.ipbbl.io.demo.models.DrawingRoom;

public class DrawingRoomRequest {
    private String username;

    private String url;

    private int timeForDrawing;

    private int numberOfRounds;

    private String creatorUsername;

    private String language;

    public DrawingRoomRequest() {}

    public DrawingRoomRequest(
            String username, String url, int timeForDrawing, int numberOfRounds, String creatorUsername,  String language) {
        this.username = username;
        this.url = url;
        this.timeForDrawing = timeForDrawing;
        this.numberOfRounds = numberOfRounds;
        this.creatorUsername = creatorUsername;
        this.language = language;
    }

    public String getUsername() { return username; }

    public void setUsername(String username) { this.username = username; }

    public String getUrl() { return url; }

    public void setUrl(String url) { this.url = url; }

    public int getTimeForDrawing() { return timeForDrawing; }

    public void setTimeForDrawing(int timeForDrawing) { this.timeForDrawing = timeForDrawing; }

    public int getNumberOfRounds() { return numberOfRounds; }

    public void setNumberOfRounds(int numberOfRounds) { this.numberOfRounds = numberOfRounds; }

    public String getCreatorUsername() { return creatorUsername; }

    public void setCreatorUsername(String creatorUsername) { this.creatorUsername = creatorUsername; }

    public String getLanguage() { return language; }

    public void setLanguage(String language) { this.language = language; }
}
