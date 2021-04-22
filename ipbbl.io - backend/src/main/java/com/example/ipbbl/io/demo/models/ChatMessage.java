package com.example.ipbbl.io.demo.models;

public class ChatMessage {
    private String content;

    private User sender;

    private MessageType type;

    public ChatMessage() {}

    public ChatMessage(String content, User sender, MessageType type) {
        this.content = content;
        this.sender = sender;
        this.type = type;
    }

    public ChatMessage(MessageType type) {
        this.type = type;
    }

    public String getContent() { return content; }

    public void setContent(String content) { this.content = content; }

    public User getSender() { return sender; }

    public void setSender(User sender) { this.sender = sender; }

    public MessageType getType() { return type; }

    public void setType(MessageType type) { this.type = type; }

    public enum MessageType {
        CHAT, LEAVE, JOIN, DRAW, CONTINUE_MOVE,
        UPDATE_ROOM, CHOOSE, END_MOVE, START
    }
}
