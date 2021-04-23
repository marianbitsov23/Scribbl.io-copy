import React from 'react';
import Countdown from 'react-countdown';
import { Button, Typography } from '@material-ui/core';

const Timer = (props) => {
    const renderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
            // Render a completed state
            return <>Completed !</>;
        } else {
            return (
                <Button
                    variant="contained"
                    color="primary"
                >
                    Time remaining:  {seconds}
                </Button>
            );
        }
    };

    return(
        <>
            <Countdown
                date={Date.now() + props.timeForDrawing * 1000}
                onTick={callback => {
                    if(props.isPlaying && callback.seconds === 1) {
                        setTimeout(() => {
                            props.endMove();
                        }, 1000);
                    }
                    else {
                        props.setTime(callback.seconds) 
                    }
                }}
                renderer={renderer}
            />
        </>
    )
}

export default Timer;
