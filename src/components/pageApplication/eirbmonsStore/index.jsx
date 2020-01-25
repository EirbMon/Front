import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Box } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

import Page from '../../utils/layout/index';
import SellEirbmons from './saleEirbmons/index';
import BuyEirbmon from './buyEirbmon/index';
import Loading from '../../utils/loading/index';
import ChatPortal from '../../utils/chat/chatPortal';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
    fullwitdth: {
        width: '100%',
        position: 'relative',
    },
}));

export default function EirbmonsStore() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [salon, setSalon] = useState(null);

    const changeSalon = (salon) => {
        setSalon(salon);
    }
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Page currentPage="Boutique">
            <div className={classes.root}>
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    className={classes.tabs}
                >
                    <Tab label="Achat" {...a11yProps(0)} />
                    <Tab label="Vente" {...a11yProps(1)} />

                </Tabs>
                <TabPanel value={value} index={0} className={classes.fullwitdth}>
                    <BuyEirbmon />
                </TabPanel>
                <TabPanel value={value} index={1} className={classes.fullwitdth}>
                    <SellEirbmons />
                </TabPanel>
                <Loading />
            </div>
            {!salon ? (
                <ChatPortal salon="salonGlobal" />
            ) : null}
        </Page>
    );
}
