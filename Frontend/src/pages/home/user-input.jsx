import{ useEffect, useState } from 'react';
import Randomstring from  'randomstring';
import drawingRoomService from '../../services/drawing-room.service';

const UserInput = () => {
    const [username, setUsername] = useState("");
    const [drawingRooms, setDrawingRooms] = useState([]);

    useEffect(() => {
        getAllPublicRooms();
    }, []);

    const openRoomSettings = (history, username) => {
        const url = Randomstring.generate(10);
        drawingRoomService.createDrawingRoom({
            url: url,
            creatorUsername: username,
            numberOfRounds: 0,
            timeForDrawing: 0,
            language: "ENGLISH"
        })
        .then(result => history.push("/" + url, {defaultUsername: username, drawingRoom: result.data}))
        .catch(error => console.error(error));
    }

    const getAllPublicRooms = () => {
        drawingRoomService.getAllPublicDrawingRooms()
        .then(result => setDrawingRooms(result.data))
        .catch(error => console.error(error));
    }

    const isInvalid = username === "";

    return { username, setUsername, openRoomSettings, drawingRooms, isInvalid };
}

export default UserInput;
