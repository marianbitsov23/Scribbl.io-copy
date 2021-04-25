import { useState, useEffect } from 'react';
import languageService from '../../../services/language.service';
import drawingRoomService from '../../../services/drawing-room.service';
import SocketConnection from '../socket-connection';

const RoomState = (props) => {
    const { url, defaultUsername, drawingRoom } = props;
    const [numberOfRounds, setNumberOfRounds] = useState(3);
    const [timeForDrawing, setTimeForDrawing] = useState(60);
    const [languageIndex, setLanguageIndex] = useState(0);
    const [open, setOpen] = useState(false);
    const [users, setUsers] = useState([]);
    const [username, setUsername] = useState(defaultUsername);
    const [languages, setLanguages] = useState([]);
    const [currentUser, setCurrentUser] = useState({ 
        name: username,
        isPlaying: false,
        isCreator: false,
        isCorrect: false,
        points: 0
    });
    const { connect, stompClient } = SocketConnection({
        onMessageReceived: (payload) => {
            const response = JSON.parse(payload.body);
            if(response.type === "JOIN" || response.type === "LEAVE") {
                setUsers(response.users);
                setRoomState(JSON.parse(response.roomState));
            } else if(response.type === "UPDATE_ROOM") {
                setRoomState(JSON.parse(response.content));
            } else if(response.type === "START") {
                props.history.push("draw/" + url, { currentUser: currentUser, gameState: response });
            }
        },
        url: url,
        currentUser: currentUser,
        type: "roomState"
    });

    const setRoomState = (content) => {
        setTimeForDrawing(content.timeForDrawing);
        setLanguageIndex(content.languageIndex);
        setNumberOfRounds(content.numberOfRounds);
    }

    //Connect and Disconnect user
    useEffect(() => {
        const sender = {
            name: username,
            isPlaying: false,
            isCreator: false,
            isCorrect: false,
            points: 0
        };

        const cleanup = () => {
            stompClient.send("/api/app/disconnect/" + url,
                {},
                JSON.stringify({sender: sender, type: 'LEAVE'}));
            stompClient.disconnect();
        }
        
        window.addEventListener('beforeunload', cleanup);
        setCurrentUser({
            name: username,
            isPlaying: false,
            isCreator: false,
            isCorrect: false,
            points: 0
        });
        return () => window.removeEventListener('beforeunload', cleanup);
    }, [username]);

    //Component did mount check for login
    useEffect(() => {
        if(props.defaultUsername) {
            let newCurrentUser = currentUser;
            newCurrentUser.isCreator = true;
            setCurrentUser(newCurrentUser);
            connect();
        } else {
            setOpen(true);
        }
    }, []);

    useEffect(() => {
        languageService.getAll()
        .then(result => setLanguages(result.data))
        .catch(error => console.error(error));
    }, []);

    useEffect(() => {
        const roomState = {
            timeForDrawing: timeForDrawing,
            numberOfRounds: numberOfRounds,
            languageIndex: languageIndex
        }

        if(stompClient && currentUser.isCreator) {
            stompClient.send("/api/app/" + url + "/room/update",
                {},
                JSON.stringify({sender: currentUser, content: JSON.stringify(roomState), type: 'UPDATE_ROOM'}));
        }
    }, [timeForDrawing, numberOfRounds, languageIndex]);

    const setInputProps = (max, step) => {
        return { max: max, step: step };
    }

    const startGame = (url, language, history) => {
        drawingRoomService.updateDrawingRoom(drawingRoom.id, {
            url: url,
            creatorUsername: currentUser.name,
            numberOfRounds: numberOfRounds,
            timeForDrawing: timeForDrawing,
            language: language
        })
        .then(result => stompClient.send("/api/app/" + url + "/start", {}, JSON.stringify(result.data)))
        .catch(error => console.error(error));
    }

    const closeDialog = () => setOpen(false);

    const disabled = users.length > 1;

    return { 
        setInputProps, languages, currentUser,
        languageIndex, numberOfRounds, setOpen,
        setNumberOfRounds, timeForDrawing, disabled,
        setTimeForDrawing, setLanguageIndex,
        startGame, open, users, username,
        connect, setUsername, closeDialog
    };
}

export default RoomState;
