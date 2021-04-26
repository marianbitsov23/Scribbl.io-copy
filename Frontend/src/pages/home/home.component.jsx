import { Button, Container, TextField } from '@material-ui/core';
import React from 'react';
import UserInput from './user-input';

const Home = (props) => {
    const { setUsername, openRoomSettings, username, drawingRooms, isInvalid } = UserInput();

    return(
        <Container>
            <TextField
                margin="normal"
                id="username"
                required
                fullWidth
                label="Enter your name"
                value={username}
                onChange={event => setUsername(event.target.value)}
            />
            <Button
                variant="contained"
                color="primary"
                id="submit"
                disabled={isInvalid}
                onClick={() => openRoomSettings(props.history, username)}
            >
                Create room
            </Button>
            <div>
                {drawingRooms.map(drawingRoom => (
                    <div key={drawingRoom.id}>
                        <div>
                            {drawingRoom.url}
                        </div>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => props.history.push("/" + drawingRoom.url, username)}
                        >
                            JOIN
                        </Button>
                    </div>
                ))}
            </div>
        </Container>
    );
}

export default Home;
