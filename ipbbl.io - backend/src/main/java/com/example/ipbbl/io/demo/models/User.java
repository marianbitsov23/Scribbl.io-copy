package com.example.ipbbl.io.demo.models;

import javax.persistence.*;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private Boolean isPlaying;

    private Boolean isCreator;

    private Boolean isCorrect;

    private Integer points;

    @ManyToOne
    @JoinColumn(name = "drawing_room_id")
    private DrawingRoom drawingRoom;

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

    public void setId(Long id) { this.id = id; }

    public Long getId() { return id; }
}
