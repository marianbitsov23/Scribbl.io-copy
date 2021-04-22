import React from 'react';
import { Grid, Typography } from '@material-ui/core';

export default function MessageCard(props) {
    const { sender, content, type} = props;

    return (
        <Grid container wrap="nowrap" spacing={2}>
            {type === "CHAT" &&
                <Grid item xs>
                    <Typography>
                        {sender.name}:
                    </Typography>
                </Grid>
            }
            <Grid item xs>
                <Typography>{content}</Typography>
            </Grid>
        </Grid>
    );
}