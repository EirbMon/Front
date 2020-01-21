import React, { useState } from 'react';
import { flowRight } from 'lodash/fp';
import { connect } from 'react-redux';
import { lifecycle } from 'recompose';

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
    root: {
        width: "100%",
    },
    box: {
        display: "flex",
        position: "relative",
    },
}));

function BuyEirbmon({ allEirbmonsOnSale }) {
    console.log(allEirbmonsOnSale);
    const classes = useStyles();
    let [search, setSearchValue] = useState('');

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
                    <ListItem style={{ overflow: 'auto',  position: 'abolute' }}>
                        <EirbmonsList
                            eirbmonsList={allEirbmonsOnSale}
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
        null
        ,
        {
            getAllEirbmonsOnSale: mongoAccess.GetAllEirbmonsOnSale,
        }),
    lifecycle({
        componentDidMount() {
            const { getAllEirbmonsOnSale } = this.props;
            getAllEirbmonsOnSale().then(
                (allEirbmonsOnSale) => {
                    this.setState({ allEirbmonsOnSale: allEirbmonsOnSale })
                }
            );
        }
    }
    ),
])(BuyEirbmon);
