import React from 'react';
import { Container, InputLabel, TextField, Select, Button, MenuItem, Dialog, DialogTitle, DialogContent } from '@material-ui/core';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import RoomState from './room-state';
import PlayerList from '../../../components/player-list/player-list.component';

const DrawingRoomSettings = (props) => { 
    const url = props.match.params.roomId;
    let defaultUsername, drawingRoom;
    if(props.location.state) {
        defaultUsername = props.location.state.defaultUsername;
        drawingRoom = props.location.state.drawingRoom;
    }

    const { 
        numberOfRounds, setNumberOfRounds, setOpen,
        timeForDrawing, setTimeForDrawing, currentUser,
        languages, languageIndex, setLanguageIndex, disabled,
        setInputProps, startGame, open, username, 
        connect, setUsername, users,
    } = RoomState({ url: url, defaultUsername: defaultUsername, history: props.history, drawingRoom: drawingRoom });

    return(
        <Container>
            <TextField
                margin="normal"
                required
                fullWidth
                value={numberOfRounds}
                label="Number of rounds"
                inputProps={setInputProps(10, 1)}
                InputProps={{
                    readOnly: currentUser.isCreator ? false : true,
                }}
                type="number"
                onChange={event => setNumberOfRounds(event.target.value)}
            />

            <TextField
                margin="normal"
                required
                fullWidth
                value={timeForDrawing}
                label="Draw time in seconds"
                inputProps={setInputProps(180, 10)}
                InputProps={{
                    readOnly: currentUser.isCreator ? false : true,
                }}
                type="number"
                onChange={event => setTimeForDrawing(event.target.value)}
            />

            {languages[languageIndex] &&
                <div>
                    <InputLabel>
                        Language
                    </InputLabel>
                    <Select
                        fullWidth
                        value={languageIndex}
                        inputProps={{
                            readOnly: currentUser.isCreator ? false : true,
                        }}
                        onChange={event => setLanguageIndex(event.target.value)}
                    >
                        {languages.map((language, index) => (
                            <MenuItem key={index} value={index}>
                                {language.name}
                            </MenuItem>
                        ))}
                    </Select>
                </div>
            }

            <div>
                <TextField
                    margin="normal"
                    fullWidth
                    disabled={true}
                    value={"localhost:8081/" + url}
                />
                <CopyToClipboard text={"localhost:8081/" + url}>
                    <Button
                        variant="contained"
                        color="secondary"
                    >
                        Copy to clipboard
                    </Button>
                </CopyToClipboard>
            </div>

            {defaultUsername && <Button
                fullWidth
                variant="contained"
                color="primary"
                disabled={!disabled}
                onClick={() => startGame(
                    url,
                    languages[languageIndex],
                    props.history
                )}
            >
                Start Game
            </Button>}

            <PlayerList users={users} currentUser={currentUser} />

            <Dialog
                open={open}
            >
                <DialogTitle>
                    Enter your username
                </DialogTitle>
                <DialogContent>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        value={username}
                        type="text"
                        onChange={event => setUsername(event.target.value)}
                    />
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                            connect();
                            setOpen(false);
                        }}
                    >
                        Continue
                    </Button>
                </DialogContent>
            </Dialog>
        </Container>
    );
}

export default DrawingRoomSettings;
