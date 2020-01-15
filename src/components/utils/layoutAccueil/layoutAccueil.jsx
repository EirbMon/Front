import { withStyles } from '@material-ui/core/styles';
import { AppBar, Typography, IconButton, Drawer, Toolbar, List } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

import LockOpenIcon from '@material-ui/icons/LockOpen';



const styles = () => ({
    root: {
        flexGrow: 1,
    },
    apptitle: {
        flexGrow: 1,
        textAlign: 'center',
    },
    menuButton: {
        marginLeft: -18,
        marginRight: 10,
    },
    appbar: {
        background: 'linear-gradient(to right, #0086C9, #4BC9EC);',
    },
    disconnectionButton: {
        position: 'absolute',
        right: '10px',
    },
    logo: {
        marginRight: '5px',
    },
});

const LayoutAccueil = ({ currentPage, classes, history }) => {
    return (
        <div>
            <AppBar position="fixed" className={classes.appbar}>
                <Toolbar className={classes.root} variant="dense">
                    {currentPage}
                    <Typography variant="h6" color="inherit" className={classes.apptitle}>
                        <img src="LogoEirbmon.png" alt="logo" height="30px" className={classes.logo} />
                        Eirbmon
                    </Typography>
                    <IconButton className={classes.disconnectionButton} color="inherit" aria-label="Connect" onClick={() => document.location.href="login/"}>
                        Se connecter<LockOpenIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </div>
    );
};

LayoutAccueil.propTypes = {
    classes: PropTypes.shape({
        menuButton: PropTypes.string,
        disconnectionButton: PropTypes.string,
        container: PropTypes.string,
        apptitle: PropTypes.string,
        appbar: PropTypes.string,
        root: PropTypes.string,
        logo: PropTypes.string,
    }).isRequired,
    history: PropTypes.shape({}),
    currentPage: PropTypes.string,
};

export default withRouter(withStyles(styles)(LayoutAccueil));
