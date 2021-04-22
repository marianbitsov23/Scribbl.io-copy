import { List, ListItem, ListItemText, Typography } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(0, 3),
    },
    listItem: {
        display: 'flex',
        justifyContent: 'space-around',
    },
    item: {
        margin: '16px',
    }
}));

export default function PlayerList(props) {
    const classes = useStyles();

    return(
        <>
            <List>
            {props.users.map((user, index) => (
                <ListItem className={classes.listItem} key={index}>
                    <ListItemText
                        className={classes.item}
                        primary={user.name}
                        secondary={props.currentUser.name === user.name ? '(You)' : null}
                    />
                    <Typography className={classes.item}>
                        Points: {user.points}
                    </Typography>
                </ListItem>
            ))}
            </List>
        </>
    )
}