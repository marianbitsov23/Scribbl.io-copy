import { Avatar, Button, Dialog, DialogContent, DialogTitle, Slider } from '@material-ui/core';
import React from 'react';
import CanvasDraw from 'react-canvas-draw';
import Chat from '../../components/chat/chat.component';
import PlayerList from '../../components/player-list/player-list.component';
import Timer from '../../components/timer-display/timer.component';
import WordDisplay from '../../components/word-display/word-display.component';
import GameState from './game-state';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    drawing: {
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
    },
    heading: {
        display: "flex",
        justifyContent: "space-between",
    },
    canvas: {
        display: "flex",
        justifyContent: "space-between",
    },
    tools: {
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
    },
    colors: {
        margin: "16px"
    },
    clear: {
        marginRight: "16px"
    },
    edit: {
        display: "flex",
        width: "100%",
        margin: "16px"
    },
    slider: {
        width: "50%",
        marginLeft: "16px"
    }
}));


const DrawingRoom = (props) => {
    const url = props.match.params.roomId;
    const { currentUser, gameState } = props.location.state;
    const classes = useStyles();

    const {
        messages, setCurrentUser, resultDialog, brushColor, 
        timeForDrawing, setTimeForDrawing, endMove, 
        users, open, closeDialog, numberOfRounds, colors,
        words, brushSize, setBrushSize, updatableCurrentUser,
        chosenWord, chooseWord, stompClient, gameEnd, setBrushColor
    } = GameState({ url, currentUser, gameState });

    return(
        <>
            {!open && !resultDialog && !gameEnd &&
            <>
                <div className={classes.heading}>
                    <div>
                        Round: <Avatar>{numberOfRounds}</Avatar>
                    </div>   
                    {chosenWord && 
                    <WordDisplay 
                        word={chosenWord} 
                        isPlaying={updatableCurrentUser.isPlaying} 
                        isCorrect={updatableCurrentUser.isCorrect}
                    />}
                    <Timer 
                        isPlaying={updatableCurrentUser.isPlaying}
                        setTime={(seconds) => setTimeForDrawing(seconds)} 
                        timeForDrawing={timeForDrawing} 
                        endMove={() => endMove(users)} 
                    />
                </div>
                <div className={classes.drawing}>
                    <div className={classes.canvas}>
                        <PlayerList users={users} currentUser={updatableCurrentUser} />

                        <div>
                            <CanvasDraw
                                disabled={!updatableCurrentUser.isPlaying}
                                brushRadius={brushSize}
                                brushColor={brushColor}
                                canvasHeight={600}
                                canvasWidth={800}
                            />
                            {updatableCurrentUser.isPlaying &&
                            <div className={classes.tools}>
                                <div className={classes.colors}>
                                    <h3>
                                        Choose colors
                                    </h3>
                                    {colors.map((color, index) => (
                                        <Button 
                                            key={index}
                                            style={{
                                                backgroundColor: color.hex,
                                            }}
                                            variant="contained"
                                            onClick={() => setBrushColor(color.hex)}
                                        >
                                            {color.name}
                                        </Button>
                                    ))}
                                </div>
                                <div className={classes.edit}>
                                    <div className={classes.clear}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                        >
                                            Clear
                                        </Button>
                                    </div>
                                    <div className={classes.slider}>
                                        <div>
                                            Brush size:
                                        </div>
                                        <div>
                                            <Slider value={brushSize} onChange={(event, newValue) => setBrushSize(newValue)} aria-labelledby="continuous-slider" />
                                        </div>
                                    </div>
                                </div>
                            </div>}
                        </div>

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
                    </div>
                </div>
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