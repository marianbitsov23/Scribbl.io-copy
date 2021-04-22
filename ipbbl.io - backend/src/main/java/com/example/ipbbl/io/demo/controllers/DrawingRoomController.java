package com.example.ipbbl.io.demo.controllers;

import com.example.ipbbl.io.demo.models.*;
import com.example.ipbbl.io.demo.payload.ConnectionResponse;
import com.example.ipbbl.io.demo.payload.DrawingRoomRequest;
import com.example.ipbbl.io.demo.models.GameState;
import com.example.ipbbl.io.demo.repositories.DrawingRoomRepository;
import com.example.ipbbl.io.demo.repositories.LanguageRepository;
import com.example.ipbbl.io.demo.repositories.WordRepository;
import org.apache.tomcat.util.json.JSONParser;
import org.apache.tomcat.util.json.JSONParserConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("api/drawing-room")
public class DrawingRoomController {

    @Autowired
    DrawingRoomRepository drawingRoomRepository;

    @Autowired
    LanguageRepository languageRepository;

    @Autowired
    WordRepository wordRepository;

    Map<String, List<User>> users = new HashMap<>();
    Map<String, GameState> gameStates = new HashMap<>();
    Map<String, String> roomStates = new HashMap<>();
    Map<String, List<Word>> usedWords = new HashMap<>();

    @MessageMapping("/{url}/choose/word")
    @SendTo("/api/topic/{url}")
    public ChatMessage sendWord(@DestinationVariable String url, @Payload ChatMessage word) {
        return new ConnectionResponse(
                word.getContent(),
                word.getSender(),
                ChatMessage.MessageType.CHOOSE,
                users.get(url),
                ""
        );
    }

    @MessageMapping("/{url}/end/move")
    @SendTo("/api/topic/{url}")
    public ChatMessage endMove(@DestinationVariable String url, @Payload ChatMessage chatMessage) {
        return chatMessage;
    }

    @MessageMapping("/{url}/continue/move")
    @SendTo("/api/topic/{url}")
    public GameState continueMove(@DestinationVariable String url, @Payload GameState chatMessage) {
        Optional<DrawingRoom> drawingRoom = drawingRoomRepository.findByUrl(url);
        if(drawingRoom.isPresent()) {
            GameState gameState = gameStates.get(url);
            Optional<List<Word>> foundWords = wordRepository.findAllByLanguage_Id(drawingRoom.get().getLanguage().getId());

            if(foundWords.isPresent()) {
                List<Word> oldWords = usedWords.get(url);
                oldWords.addAll(gameState.getWords());
                usedWords.put(url, oldWords);
                List<User> updatedUsers = resetUsers(chatMessage.getUsers());
                if(updatedUsers == null) {
                    //round ended
                    updatedUsers = chatMessage.getUsers();

                    for(User u : updatedUsers) {
                        u.setIsPlaying(false);
                        u.setIsCorrect(false);
                    }

                    updatedUsers.get(0).setIsPlaying(true);
                    GameState newGameState = new GameState(
                            ChatMessage.MessageType.CONTINUE_MOVE,
                            updatedUsers,
                            gameState.getTimeForDrawing(),
                            gameState.getNumberOfRounds() - 1,
                            findNewThreeWords(foundWords.get(), oldWords)
                    );
                    users.put(url, updatedUsers);
                    gameStates.put(url, newGameState);
                    return newGameState;
                } else {
                    //new move
                    GameState newGameState = new GameState(
                            ChatMessage.MessageType.CONTINUE_MOVE,
                            updatedUsers,
                            gameState.getTimeForDrawing(),
                            gameState.getNumberOfRounds(),
                            findNewThreeWords(foundWords.get(), oldWords)
                    );
                    users.put(url, updatedUsers);
                    gameStates.put(url, newGameState);
                    return newGameState;
                }
            }
        }
        return new GameState();
    }

    public List<User> resetUsers(List<User> users) {
        List<User> updatedUsers = users
                .stream()
                .peek(user -> {
                    user.setIsCorrect(false);
                }).collect(Collectors.toList());
        //find the index of the current playing player
        int index = updatedUsers.indexOf(updatedUsers.stream()
                .filter(User::getIsPlaying).findFirst().get());

        if(index + 1 == updatedUsers.size()) {
            //round ended
            return null;
        } else {
            updatedUsers.get(index).setIsPlaying(false);
            updatedUsers.get(index + 1).setIsPlaying(true);
            return updatedUsers;
        }
    }

    public List<Word> findNewThreeWords(List<Word> words, List<Word> oldWords) {
        for(Word ow : oldWords) {
            for (Word w : words) {
                if(ow.getName().equals(w.getName())) {
                    words.remove(w);
                    break;
                }
            }
        }

        return getThreeRandomWords(words);
    }

    public List<Word> getThreeRandomWords(List<Word> foundWords) {
        Random rand = new Random();
        List<Word> words = new ArrayList<>();
        for(int i = 0; i < 3; i++) {
            int randomIndex = rand.nextInt(foundWords.size());
            words.add(foundWords.get(randomIndex));
            foundWords.remove(randomIndex);
        }

        return words;
    }

    @MessageMapping("/{url}/room/update")
    @SendTo("/api/topic/{url}")
    public ChatMessage updateUsers(@DestinationVariable String url, @Payload ChatMessage roomState) {
        roomStates.put(url, roomState.getContent());
        return roomState;
    }

    @MessageMapping("/{url}/update")
    @SendTo("/api/topic/{url}")
    public ChatMessage sendUpdateToGame(@DestinationVariable String url, @Payload ChatMessage roomState) {
        return roomState;
    }

    @MessageMapping("/{url}/start")
    @SendTo("/api/topic/{url}")
    public GameState startGame(@DestinationVariable String url, @Payload DrawingRoom drawingRoom) {
        Optional<List<Word>> foundWords = wordRepository.findAllByLanguage_Id(drawingRoom.getLanguage().getId());
        if(foundWords.isPresent()) {
            if(gameStates.get(url) != null) {
                return gameStates.get(url);
            } else {
                List<User> newUsers = users.get(url);
                //setting the first guy that joined to be the player
                newUsers.get(0).setIsPlaying(true);
                List<Word> words = getThreeRandomWords(foundWords.get());
                GameState newGameState = new GameState(
                        ChatMessage.MessageType.START,
                        newUsers,
                        drawingRoom.getTimeForDrawing(),
                        drawingRoom.getNumberOfRounds(),
                        words
                );
                usedWords.put(url, words);
                gameStates.put(url, newGameState);
                return newGameState;
            }
        } else {
            return new GameState();
        }
    }

    @MessageMapping("/{url}/draw")
    @SendTo("/api/topic/{url}")
    public ChatMessage sendDrawingBoard(@DestinationVariable String url, @Payload ChatMessage saveData) {
        return new ChatMessage(
                saveData.getContent(),
                saveData.getSender(),
                ChatMessage.MessageType.DRAW
        );
    }

    @MessageMapping("/{url}/join")
    @SendTo("/api/topic/{url}")
    public ConnectionResponse joinDrawingRoom(@DestinationVariable String url, @Payload ChatMessage chatMessage) {
        List<User> updatedUsers = new ArrayList<>();
        String roomState = chatMessage.getContent();
        if(users.containsKey(url) && roomStates.containsKey(url)) {
            updatedUsers = users.get(url);
            roomState = roomStates.get(url);
        } else {
            roomStates.put(url, roomState);
        }
        updatedUsers.add(chatMessage.getSender());
        users.put(url, updatedUsers);

        return new ConnectionResponse(
                "User " + chatMessage.getSender().getName() + " joined!",
                chatMessage.getSender(),
                ChatMessage.MessageType.JOIN,
                updatedUsers,
                roomState
        );
    }

    @MessageMapping("disconnect/{url}")
    @SendTo("/api/topic/{url}")
    public ConnectionResponse disconnectDrawingRoom(@DestinationVariable String url, @Payload ChatMessage chatMessage) {
        List<User> updatedUsers = users.get(url);
        users.put(url, updatedUsers.stream().filter(user -> !user.getName().equals(chatMessage.getSender().getName())).collect(Collectors.toList()));
        return new ConnectionResponse(
                "User " + chatMessage.getSender().getName() + " disconnected!",
                chatMessage.getSender(),
                ChatMessage.MessageType.LEAVE,
                users.get(url),
                ""
        );
    }

    @PostMapping
    public ResponseEntity<DrawingRoom> createDrawingRoom(@RequestBody DrawingRoomRequest drawingRoomRequest) {
        Language language = languageRepository.findByName(ELanguage.valueOf(drawingRoomRequest.getLanguage()))
                .orElseThrow(() -> new RuntimeException("Error: language is not found"));

        DrawingRoom drawingRoom = new DrawingRoom(
                drawingRoomRequest.getUrl(),
                drawingRoomRequest.getTimeForDrawing(),
                drawingRoomRequest.getNumberOfRounds(),
                drawingRoomRequest.getCreatorUsername(),
                language
        );

        return new ResponseEntity<>(drawingRoomRepository.save(drawingRoom), HttpStatus.OK);
    }

    @GetMapping("/{url}")
    public ResponseEntity<DrawingRoom> getDrawingRoomByURL(@PathVariable String url) {
        Optional<DrawingRoom> drawingRoom = drawingRoomRepository.findByUrl(url);

        return drawingRoom.map(room -> new ResponseEntity<>(room, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
}
