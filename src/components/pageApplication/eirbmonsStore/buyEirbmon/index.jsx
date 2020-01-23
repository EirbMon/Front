import React, { useState, useEffect } from 'react';
import { flowRight } from 'lodash/fp';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import TextField from '@material-ui/core/TextField'
import Avatar from '@material-ui/core/Avatar';
import SearchIcon from '@material-ui/icons/Search';
import { Paper } from '@material-ui/core';
import { Box } from '@material-ui/core';

import EirbmonsList from '../eirbmonsList';
import mongoAccess from '../../../../actions/withApi';

const useStyles = makeStyles(theme => ({
    tableWrapper: {
        overflowX: 'auto',
        overflowY: 'hidden',
        padding: theme.spacing(3),
        margin: '48px auto 0 auto',
    },
    root: {
        width: "100%",
    },
    box: {
        display: "flex",
        position: "relative",
    },
}));

function BuyEirbmon({ getAllEirbmonsOnSale, accountAddress }) {
    const classes = useStyles();
    let [search, setSearchValue] = useState('');
    let [allEirbmonsOnSale, setAllEirbmonsOnSale] = useState([]);

    useEffect(() => {
        getAllEirbmonsOnSale().then(
            (allEirbmonsOnSaleFromMongo) => {
                setAllEirbmonsOnSale(allEirbmonsOnSaleFromMongo.filter(eirbmon => { return eirbmon.owner_id !== accountAddress.toLowerCase() }))
            }
        );
    }, []);

    function refresh() {
        getAllEirbmonsOnSale().then(
            (allEirbmonsOnSaleFromMongo) => {
                setAllEirbmonsOnSale(allEirbmonsOnSaleFromMongo.filter(eirbmon => { return eirbmon.owner_id !== accountAddress.toLowerCase() }))
            }
        );
    }

    return (
        <Box className={classes.box}>
            <Paper className={classes.root} elevation={2}>
                <List className={classes.root}>
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
                            eirbmonsList={allEirbmonsOnSale}
                            refresh={() => { refresh() }}
                            action="buy"
                        />
                    </ListItem>
                </List>
            </Paper>
        </Box>
    );
}

export default flowRight([
    connect(
        (state) => ({
            accountAddress: state.accountInfo.accountUrl,
        })
        ,
        {
            getAllEirbmonsOnSale: mongoAccess.GetAllEirbmonsOnSale,
        }),
]) (BuyEirbmon);
