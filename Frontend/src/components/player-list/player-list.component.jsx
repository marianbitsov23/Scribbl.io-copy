import { List, ListItem, Typography } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    list: {
        backgroundColor: '#d3d3d3',
        margin: '0 16px'
    },
    listItem: {
        display: 'flex',
        flexDirection: 'column',
    },
    item: {
        display: 'flex',
        margin: '0 16px',
        width: '100%',
        justifyContent: "space-between",
    }
}));

export default function PlayerList(props) {
    const classes = useStyles();

    return(
        <>
            <List className={classes.list}>
            {props.users.map((user, index) => (
                <ListItem className={classes.listItem} key={index}>
                    <div
                        id="user-list"
                        className={classes.item}
                    >
                        <div>{user.name}</div>
                        <div>{props.currentUser.name === user.name ? '(You)' : null}</div>
                        <div>Points: {user.points}</div>
                    </div>
                    <Typography className={classes.item}>
                        
                    </Typography>
                </ListItem>
            ))}
            </List>
        </>
    )
}