import { useState } from 'react';

const MessageHandler = (props) => {
    const [chatInput, setChatInput] = useState("");
    const stompClient = props.stompClient;
    const { timeForDrawing, url, users, word, currentUser, setCurrentUser } = props;

    const enterMessage = (value) => setChatInput(value);

    const sendMessage = () => {
        let chatMessage = {
            sender: currentUser,
            content: chatInput !== word.name
                ? chatInput 
                : " guessed the word!",
            type: 'CHAT'
        };

        if(chatInput === word.name) {
            users.forEach(user => {
                let newUser = currentUser;
                newUser.isCorrect = true;
                newUser.points = timeForDrawing * 10;
                setCurrentUser(newUser);
                if(currentUser.name === user.name) {
                    user.isCorrect = true;
                    user.points += timeForDrawing * 10;
                }
            });
            stompClient.send("/api/app/" + url + "/update",
            {},
            JSON.stringify({ sender: currentUser, content: JSON.stringify(users), type: "UPDATE_ROOM" }));
        }
        stompClient.send("/api/app/chat.send/" + url, 
        {}, 
        JSON.stringify(chatMessage));
        
        setChatInput("");
    }

    return { chatInput, sendMessage, enterMessage };
}

export default MessageHandler;
