package com.example.ipbbl.io.demo.payload;

import com.example.ipbbl.io.demo.models.ChatMessage;
import com.example.ipbbl.io.demo.models.User;

import java.util.List;

public class ConnectionResponse extends ChatMessage {
    private List<User> users;

    private String roomState;

    public ConnectionResponse(String content, User sender, MessageType type, List<User> users, String roomState) {
        super(content, sender, type);
        this.users = users;
        this.roomState = roomState;
    }

    public String getRoomState() { return roomState; }

    public void setRoomState(String roomState) { this.roomState = roomState; }

    public List<User> getUsers() { return users; }

    public void setUsers(List<User> users) { this.users = users; }
}
