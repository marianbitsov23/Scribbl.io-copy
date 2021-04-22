import axios from 'axios';

const API_URL = "http://localhost:8080/api/drawing-room";

class DrawingRoomService {
    createDrawingRoom(drawingRoom) {
        return axios.post(
            API_URL,
            {
                username: drawingRoom.username,
                url: drawingRoom.url,
                timeForDrawing: drawingRoom.timeForDrawing,
                numberOfRounds: drawingRoom.numberOfRounds,
                creatorUsername: drawingRoom.creatorUsername,
                language: drawingRoom.language
            }
        );
    }

    getDrawingRoomByURL(url) {
        return axios.get(API_URL + "/" + url);
    }
}

export default new DrawingRoomService();