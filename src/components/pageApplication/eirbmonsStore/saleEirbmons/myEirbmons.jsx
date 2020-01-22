import React, { useState, useEffect } from 'react';
import { flowRight } from 'lodash/fp';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import TextField from '@material-ui/core/TextField'
import Avatar from '@material-ui/core/Avatar';
import SearchIcon from '@material-ui/icons/Search';
import Divider from '@material-ui/core/Divider';
import { Paper } from '@material-ui/core';

import mongoAccess from '../../../../actions/withApi';
import EirbmonsList from '../eirbmonsList';

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
    },

}));

function MyEirbmons({ getOwnerEirbmon, accountAddress }) {
    const classes = useStyles();
    let [search, setSearchValue] = useState('');
    let [myEirbmons, setMyEirbmons] = useState([]);

    useEffect(() => {
        getOwnerEirbmon(accountAddress)
            .then(
                (myEirbmonsFromMongo) => {
                    setMyEirbmons(myEirbmonsFromMongo.filter((myEirbmon) => { return myEirbmon.canBeSelled === false }))
                }
            );
    }, []);

    function refresh() {
        getOwnerEirbmon(accountAddress)
            .then(
                (myEirbmonsFromMongo) => {
                    setMyEirbmons(myEirbmonsFromMongo.filter((myEirbmon) => { return myEirbmon.canBeSelled === false }));
                }
            );
    }

    return (
        <Paper className={classes.root} elevation={2}>
            <List className={classes.root}>
                <ListItem>
                    <ListItemText primary="Mes Eirbmons" />
                </ListItem>
                <Divider component="li" />
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <SearchIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <TextField
                        value={search}
                        onChange={(e) => { setSearchValue(e.target.value) }}
                        className={classes.root}
                        label={"Entrez un nom d'EirbMon"}
                    />
                </ListItem>

                <ListItem style={{ overflow: 'auto', position: 'abolute' }}>
                    <EirbmonsList
                        eirbmonsList={myEirbmons}
                        refresh={() => { refresh() }}
                        action="mine"
                    />
                </ListItem>


            </List>
        </Paper>
    );
}

export default flowRight([
    connect(
        (state) => ({
            accountAddress: state.accountInfo.accountUrl,
        })
        ,
        {
            getOwnerEirbmon: mongoAccess.GetOwnerEirbmon,
        }),
])(MyEirbmons);