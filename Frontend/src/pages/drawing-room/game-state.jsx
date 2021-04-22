import { useState, useEffect, useRef } from 'react';
import SocketConnection from './socket-connection';

const GameState = (props) => {
    const { url } = props;
    const [updatableCurrentUser, setCurrentUser] = useState(props.currentUser);
    const [messages, setMessages] = useState([]);
    const [gameState, setGameState] = useState(props.gameState);
    const [chosenWord, setChosenWord] = useState();
    const [words, setWords] = useState(gameState.words);
    const [numberOfRounds, setNumberOfRounds] = useState(gameState.numberOfRounds);
    const [timeForDrawing, setTimeForDrawing] = useState(gameState.timeForDrawing);
    const [users, setUsers] = useState([]);
    const [open, setOpen] = useState(false);
    const [gameEnd, setGameEnd] = useState(false);
    const [resultDialog, setResultDialog] = useState(false);
    const [saveData, setSaveData] = useState();
    const canvasDraw = useRef(null);

    const onMessageReceived = (payload) => {
        const response = JSON.parse(payload.body);
        
        if(response.type === "CHOOSE") {
            setChosenWord(JSON.parse(response.content));
            setUsers(response.users);
            setOpen(false);
        }else if(response.type === "DRAW" && response.sender.name !== updatableCurrentUser.name) {
            //implement drawing
            setSaveData(canvasDraw.current.loadSaveData(response.content, true));
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
            console.log(response.users);
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

        console.log(users);
        //display the result dialog
        setTimeout(() => {
            //send a notification for a game continue()
            //and reset all isCorrect on all users
            stompClient.send("/api/app/" + url + "/continue/move", {},
                JSON.stringify({ type: "CONTINUE_MOVE", users: users }));
        }, 3000);
    }

    return {
        messages, stompClient, setCurrentUser, endMove, updatableCurrentUser,
        timeForDrawing, setTimeForDrawing, numberOfRounds,
        users, setUsers, open, closeDialog, chooseWord, words,
        chosenWord, resultDialog, setResultDialog, gameEnd
    }
}

export default GameState;
