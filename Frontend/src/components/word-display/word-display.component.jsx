import { Paper, Typography } from '@material-ui/core';
import React from 'react';
import WordSize from './word-size';

const WordDisplay = (props) => {
    const { wordSize } = WordSize(props);

    return(
        <Paper>
            {props.isPlaying && 
                <Typography>
                    {props.word.name}
                </Typography>
            }{!props.isPlaying &&
                <Typography>
                    {wordSize.map((letter, index) => (
                        <>
                            {index === props.word.name.length - 1 && props.isCorrect && <span>{letter}</span>}
                            {!(index === props.word.name.length-1) && !props.isCorrect && <span>_ </span>}
                        </>
                    ))}
                </Typography>
            }
        </Paper>
    )
}

export default WordDisplay;
