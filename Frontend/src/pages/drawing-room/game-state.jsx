import { useState, useEffect, useRef } from 'react';
import SocketConnection from './socket-connection';

const GameState = (props) => {
    const { url, canvasRef } = props;
    const [updatableCurrentUser, setCurrentUser] = useState(props.currentUser);
    const [messages, setMessages] = useState([]);
    const [brushColor, setBrushColor] = useState("#000000");
    const [brushSize, setBrushSize] = useState(30);
    const [gameState, setGameState] = useState(props.gameState);
    const [chosenWord, setChosenWord] = useState();
    const [words, setWords] = useState(gameState.words);
    const [numberOfRounds, setNumberOfRounds] = useState(gameState.numberOfRounds);
    const [timeForDrawing, setTimeForDrawing] = useState(gameState.timeForDrawing);
    const [users, setUsers] = useState([]);
    const [open, setOpen] = useState(false);
    const [gameEnd, setGameEnd] = useState(false);
    const [resultDialog, setResultDialog] = useState(false);
    const [saveData, setSaveData] = useState(new ImageData(800, 600));
    const colors = [
        "#000000", //black
        "#ffffff", //white
        "#d3d3d3", //light gray
        "#ff0000",//red
        "#ffff00", //yellow
        "#0000ff", //blue
        "#008000", //green
        "#00008b", //dark blue
        "#800080", //purple
        "#ffc0cb", //pink
        "#8b4513" //brown
    ];

    const onMessageReceived = (payload) => {
        const response = JSON.parse(payload.body);
        
        if(response.type === "CHOOSE") {
            setChosenWord(JSON.parse(response.content));
            setUsers(response.users);
            setOpen(false);
        }else if(response.type === "DRAW" && response.sender.name !== updatableCurrentUser.name) {
            //implement drawing
            let recievedData = new Map(JSON.parse(response.content));
            let newSavedData = saveData;
            recievedData.forEach((value, key) => {
                newSavedData.data[key] = value;
            })
            setSaveData(newSavedData);
        } else if(response.type === "UPDATE_ROOM") {
            const users = JSON.parse(response.content);
            setUsers(users);
            if(updatableCurrentUser.isPlaying 
                && [...users].filter(user => user.isCorrect === false).length === 1) {
                    endMove(users);
            }
        } else if(response.type === "END_MOVE") {
            setResultDialog(true);
        } else if(response.type === "CONTINUE_MOVE") {
            setOpen(true);
            setTimeForDrawing(response.timeForDrawing);
            setNumberOfRounds(response.numberOfRounds);
            setCurrentUser(response.users.filter(user => user.name === updatableCurrentUser.name)[0]);
            setUsers(response.users);
            setWords(response.words)
            setResultDialog(false);
        } else if(response.type === "JOIN" || response.type === "LEAVE") {
            setUsers(response.users);
            setMessages(messages => [...messages, response]);
        } else if(response.type === "CHAT") {
            setMessages(messages => [...messages, response]);
        }
    }

    const { connect, stompClient } = SocketConnection({
        onMessageReceived: onMessageReceived,
        url: url,
        currentUser: updatableCurrentUser,
        type: "gameState"
    });

    //start game
    useEffect(() => {
        connect();
        updatableCurrentUser.isPlaying = updatableCurrentUser.isCreator ? true : false;
        setOpen(true);
    }, []);

    //check for game end
    useEffect(() => {
        if(numberOfRounds <= 0) {
            //end game
            setOpen(false);
            setGameEnd(true);
        }
    }, [numberOfRounds]);

    //Connect and disconnect User
    useEffect(() => {
        const sender = updatableCurrentUser;

        const cleanup = () => {
            stompClient.send("/api/app/disconnect/" + url,
                {},
                JSON.stringify({sender: sender, type: 'LEAVE'}))
            stompClient.disconnect();
        }
        window.addEventListener('beforeunload', cleanup);
        return () => window.removeEventListener('beforeunload', cleanup);
    }, [stompClient, url]);

    const closeDialog = () => setOpen(false);

    const chooseWord = (word) => {
        stompClient.send("/api/app/" + url + "/choose/word",
                {},
                JSON.stringify({ sender: updatableCurrentUser, content: JSON.stringify(word), type: "CHOOSE" }));
    }

    const endMove = (users) => {
        //send a notificaiton for a move end
        stompClient.send("/api/app/" + url + "/end/move", {},
            JSON.stringify({ sender: updatableCurrentUser, content: "", type: "END_MOVE" }));

        //display the result dialog
        setTimeout(() => {
            //send a notification for a game continue()
            //and reset all isCorrect on all users
            stompClient.send("/api/app/" + url + "/continue/move", {},
                JSON.stringify({ type: "CONTINUE_MOVE", users: users }));
        }, 4000);
    }


    const proccessChunk = async (pixels) => {
        let mapChunk = new Map();

        pixels.forEach((pixel, index) => {
            if(pixel !== 0) {
                mapChunk.set(index, pixel);
            }
        });
        return mapChunk;
    }

    const draw = (event) => {
        console.log(event);
    }

    return {
        messages, stompClient, setCurrentUser, endMove, updatableCurrentUser,
        timeForDrawing, setTimeForDrawing, numberOfRounds, colors,
        brushColor, setBrushColor, users, setUsers, draw, saveData,
        open, closeDialog, chooseWord, words, brushSize, setBrushSize,
        chosenWord, resultDialog, setResultDialog, gameEnd
    }
}

export default GameState;
