import { useState, useEffect } from 'react';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';

const SocketConnection = (props) => {
    const [stompClient, setStompClient] = useState();
    const { url, currentUser, onMessageReceived, type } = props;

    const connect = () => {
        console.log('asdfas');
        let mySockJS = new SockJS("http://localhost:8080/api/chat");
        setStompClient(Stomp.over(mySockJS));
    }
    
    const onError = (error) => console.log(error);

    useEffect(() => {
        const onConnected = () => {
            const defaultRoom = {
                timeForDrawing: 60, 
                numberOfRounds: 3, 
                languageIndex: 0
            }

            stompClient.subscribe('/api/topic/' + url, onMessageReceived);
            if(type === "roomState") {
                stompClient.send("/api/app/" + url + "/join",
                    {},
                    JSON.stringify({
                        sender: currentUser, 
                        content: JSON.stringify(defaultRoom), 
                        type: 'JOIN'
                }));
            }
        }

        if(stompClient) {
            stompClient.connect({}, onConnected, onError);
        }
    }, [stompClient, currentUser, onMessageReceived, url]);

    return { connect, stompClient };
}

export default SocketConnection;
