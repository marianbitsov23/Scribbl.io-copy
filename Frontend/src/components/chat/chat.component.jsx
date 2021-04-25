import React from 'react';
import { TextField, Button, Paper } from '@material-ui/core';
import MessageCard from './message-card.component';
import { makeStyles } from '@material-ui/core/styles';
import MessageHandler from './message-handler';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        overflow: 'hidden',
        padding: theme.spacing(0, 3),
    },
    paper: {
        maxWidth: 400,
        width: 400,
        height: 500,
        margin: `${theme.spacing(1)}px auto`,
        padding: theme.spacing(2),
    },
}));

const Chat = (props) => {
    const { currentUser, messages } = props;
    const { chatInput, sendMessage, enterMessage } = MessageHandler(props);
    const isInvalid = chatInput === "" || currentUser.isCorrect;
    const classes = useStyles();

    return(
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <h2>Chat:</h2>
                {messages.map((message, index) => (
                    <MessageCard 
                        key={index} 
                        sender={message.sender} 
                        content={message.content} 
                        type={message.type} 
                    />
                ))}
                {!currentUser.isPlaying &&
                    <>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            value={chatInput}
                            type="text"
                            onChange={event => enterMessage(event.target.value)}
                        />
                        <Button
                            variant="contained"
                            color="secondary"
                            disabled={isInvalid}
                            onClick={sendMessage}
                        >
                            Send message
                        </Button>
                    </>
                }
            </Paper>
        </div>
    )
}

export default Chat;