import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

import MyEirbmons from './myEirbmons';
import EirbmonsOnSale from './eirbmonsOnSale';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    box: {
        display:"flex",
        position: "relative",
        width:"50%",
    },
}));

export default function SellEirbmons() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Box className={classes.box}>
                <MyEirbmons/>
            </Box>

            <Box className={classes.box} marginLeft="20px">
                <EirbmonsOnSale />
            </Box>
        </div>
    );
}
