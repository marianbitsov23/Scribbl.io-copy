import{ useState } from 'react';
import Randomstring from  'randomstring';

const UserInput = () => {
    const [username, setUsername] = useState("");

    const openRoomSettings = (history, username) => {
        const url = Randomstring.generate(10);
        history.push("/" + url, username);
    }

    const isInvalid = username === "";

    return { username, setUsername, openRoomSettings, isInvalid };
}

export default UserInput;
