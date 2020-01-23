import React, { useState, useEffect } from 'react';
import { flowRight } from 'lodash/fp';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

import MyEirbmons from './myEirbmons';
import EirbmonsOnSale from './eirbmonsOnSale';

import mongoAccess from '../../../../actions/withApi';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    box: {
        display: "flex",
        position: "relative",
        width: "50%",
    },
}));

function SellEirbmons({ getMyEirbmonsOnSale, accountAddress, getOwnerEirbmon }) {
    const classes = useStyles();
    let [myEirbmonsOnSale, setMyEirbmonsOnSale] = useState([]);
    let [myEirbmons, setMyEirbmons] = useState([]);

    useEffect(() => {

        getMyEirbmonsOnSale(accountAddress)
            .then(
                (myEirbmonsOnSaleFromMongo) => {
                    console.log(myEirbmonsOnSaleFromMongo)
                    setMyEirbmonsOnSale(myEirbmonsOnSaleFromMongo);
                }
            );

        getOwnerEirbmon(accountAddress)
            .then(
                (myEirbmonsFromMongo) => {
                    console.log(myEirbmonsFromMongo)
                    setMyEirbmons(myEirbmonsFromMongo.filter((myEirbmon) => { return myEirbmon.canBeSelled === false }))
                }
            );

    }, []);

    function refresh() {
        getMyEirbmonsOnSale(accountAddress)
            .then(
                (myEirbmonsOnSaleFromMongo) => {
                    setMyEirbmonsOnSale(myEirbmonsOnSaleFromMongo);
                }
            );
        getOwnerEirbmon(accountAddress)
            .then(
                (myEirbmonsFromMongo) => {
                    setMyEirbmons(myEirbmonsFromMongo.filter((myEirbmon) => { return myEirbmon.canBeSelled === false }));
                }
            );
    }

    return (
        <div className={classes.root}>
            <Box className={classes.box}>
                <MyEirbmons
                    myEirbmons={myEirbmons}
                    refresh={() => { refresh() }}
                />
            </Box>

            <Box className={classes.box} marginLeft="20px">
                <EirbmonsOnSale
                    myEirbmonsOnSale={myEirbmonsOnSale}
                    refresh={() => { refresh() }}
                />
            </Box>
        </div>
    );
}

export default flowRight([
    connect(
        (state) => ({
            accountAddress: state.accountInfo.accountUrl,
        })
        ,
        {
            getMyEirbmonsOnSale: mongoAccess.GetMyEirbmonsOnSale,
            getOwnerEirbmon: mongoAccess.GetOwnerEirbmon,
        }),
])(SellEirbmons);