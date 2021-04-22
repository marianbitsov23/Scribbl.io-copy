import { Avatar, Button, Dialog, DialogContent, DialogTitle, TextField } from '@material-ui/core';
import React from 'react';
import Chat from '../../components/chat/chat.component';
import PlayerList from '../../components/player-list/player-list.component';
import Timer from '../../components/timer-display/timer.component';
import WordDisplay from '../../components/word-display/word-display.component';
import GameState from './game-state';

const DrawingRoom = (props) => {
    const url = props.match.params.roomId;
    const { currentUser, gameState } = props.location.state;

    const {
        messages, setCurrentUser, resultDialog,
        timeForDrawing, setTimeForDrawing, endMove, updatableCurrentUser,
        users, open, closeDialog, numberOfRounds, words,
        chosenWord, chooseWord, stompClient, gameEnd
    } = GameState({ url, currentUser, gameState });

    return(
        <>
            {!open &&
            <>
                <div>
                    Round: <Avatar>{numberOfRounds}</Avatar>
                </div>
                <Timer setTime={(seconds) => setTimeForDrawing(seconds)} timeForDrawing={timeForDrawing} endMove={endMove.bind(this, users)} />
                {chosenWord && <WordDisplay word={chosenWord} isPlaying={updatableCurrentUser.isPlaying} isCorrect={updatableCurrentUser.isCorrect} />}
                <PlayerList users={users} currentUser={updatableCurrentUser} />
                <Chat 
                    currentUser={updatableCurrentUser} 
                    messages={messages}
                    stompClient={stompClient} 
                    setCurrentUser={setCurrentUser} 
                    timeForDrawing={timeForDrawing}
                    url={url} 
                    users={users}
                    word={chosenWord}
                />
            </>
            }
            <Dialog
                open={open}
                onClose={closeDialog}
            >
                <DialogTitle>
                    {updatableCurrentUser.isPlaying ? <>Choose a word</> : <>Player is choosing a word...</>}
                </DialogTitle>
                <DialogContent>
                    {updatableCurrentUser.isPlaying && words.map((word, index) => (
                        <Button
                            key={index}
                            variant="contained"
                            color="primary"
                            onClick={event => chooseWord(word)}
                        >
                            {word.name}
                        </Button>
                    ))}
                </DialogContent>
            </Dialog>
            <Dialog
                open={resultDialog}
            >
                <DialogTitle>
                    {chosenWord && <>The chosen word was : "{chosenWord.name}"</>}
                </DialogTitle>
                <DialogContent>
                    {users.map((user, index) => (
                        <div key={index}>User: {user.name} has points: {user.points}</div>
                    ))}
                </DialogContent>
            </Dialog>

            <Dialog
                open={gameEnd}
            >
                <DialogTitle>
                    "These are the results"
                </DialogTitle>
                <DialogContent>
                    {users.map((user, index) => (
                        <div key={index}>User: {user.name} has points: {user.points}</div>
                    ))}
                </DialogContent>
            </Dialog>
        </>
    );
}

export default DrawingRoom;