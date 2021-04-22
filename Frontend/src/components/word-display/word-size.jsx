import { useState, useEffect } from 'react';

const WordSize = (props) => {
    const [wordSize, setWordSize] = useState([]);
    const word = props.word;
    
    useEffect(() => {
        for(let i = 0; i < word.name.length; i++) {
            setWordSize(wordSize => [...wordSize, word.name.charAt(i)]);
        }
    }, [word]);

    return { wordSize };
}

export default WordSize;
