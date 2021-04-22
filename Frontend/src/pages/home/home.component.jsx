import { Button, Container, TextField } from '@material-ui/core';
import React from 'react';
import UserInput from './user-input';

const Home = (props) => {
    const { setUsername, openRoomSettings, username, isInvalid } = UserInput();

    return(
        <Container>
            <TextField
                margin="normal"
                required
                fullWidth
                label="Enter your name"
                value={username}
                onChange={event => setUsername(event.target.value)}
            />
            <Button
                variant="contained"
                color="primary"
                disabled={isInvalid}
                onClick={() => openRoomSettings(props.history, username)}
            >
                Create room
            </Button>
            <>
                {/* public chat list here */}
            </>
        </Container>
    );
}

export default Home;
