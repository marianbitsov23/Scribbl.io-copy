import { Paper } from '@material-ui/core';
import React from 'react';
import WordSize from './word-size';

const WordDisplay = (props) => {
    const { wordSize } = WordSize(props);

    return(
        <Paper>
            {props.isPlaying && 
                <h1 style={{ textAlign: "center" }}>
                    {props.word.name}
                </h1>
            }{!props.isPlaying &&
                <>
                    <h1>
                        {wordSize.map((letter, index) => (
                            <>
                                {index === props.word.name.length - 1 || props.isCorrect && <span>{letter}</span>}
                                {!props.isCorrect && letter !== ' ' && <span>_ </span>}
                                {letter === ' ' && <span style={{ margin: '0 16px' }}>{' '}</span>}
                            </>
                        ))}
                        
                    </h1>
                    <h2>
                        {!props.isCorrect && <>word size: ({wordSize.length})</>}
                    </h2>
                </>
            }
        </Paper>
    )
}

export default WordDisplay;
