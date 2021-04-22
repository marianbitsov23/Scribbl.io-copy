import React from 'react';
import Countdown from 'react-countdown';
import { Button } from '@material-ui/core';

const Timer = (props) => {
    const renderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
            // Render a completed state
            return <>Completed !</>;
        } else {
            return (
                <Button>
                    {seconds}
                </Button>
            );
        }
    };

    return(
        <>
            <Countdown
                date={Date.now() + props.timeForDrawing * 1000}
                onTick={callback => {
                    if(callback.completed) props.endMove();
                    else props.setTime(callback.seconds) 
                }}
                renderer={renderer}
            />
        </>
    )
}

export default Timer;
