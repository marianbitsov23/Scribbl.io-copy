package com.example.ipbbl.io.demo.models;

public class User {
    private String name;

    private Boolean isPlaying;

    private Boolean isCreator;

    private Boolean isCorrect;

    private Integer points;

    public User() {}

    public User(String name, Boolean isPlaying, Boolean isCreator, Integer points, Boolean isCorrect) {
        this.name = name;
        this.isPlaying = isPlaying;
        this.isCreator = isCreator;
        this.points = points;
        this.isCorrect = isCorrect;
    }

    public String getName() {
        return name;
    }

    public Boolean getIsPlaying() { return isPlaying; }

    public Boolean getIsCreator() { return isCreator; }

    public Integer getPoints() { return points; }

    public void setPoints(Integer points) { this.points = points; }

    public void setName(String name) { this.name = name; }

    public void setIsPlaying(Boolean playing) { isPlaying = playing; }

    public void setIsCreator(Boolean creator) { isCreator = creator; }

    public Boolean getIsCorrect() { return isCorrect; }

    public void setIsCorrect(Boolean correct) { isCorrect = correct; }
}
