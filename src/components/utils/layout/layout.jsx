import { withStyles } from '@material-ui/core/styles';
import { AppBar, Typography, IconButton, Drawer, Toolbar, List, Divider } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

import ItemLayout from './itemLayout';
import disconnect from '../../../functions/disconnect';

const drawerWidth = 400;

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
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
});

const Layout = ({ currentPage, classes, history }) => {
    const [isOpen, setIsOpen] = useState(false);

    const [openChat, setOpenChat] = React.useState(false);

    const handleDrawerOpenChat = () => {
        setOpenChat(true);
    };

    const handleDrawerCloseChat = () => {
        setOpenChat(false);
    };

    return (
        <div>
            <Drawer open={isOpen} onClose={() => setIsOpen(!isOpen)}>
                <div tabIndex="0" role="button" onKeyPress={() => console.log('window')} onClick={() => setIsOpen(!isOpen)}>
                    <List component="nav">
                        <ItemLayout page="unity" primary="Jeux" secondary="Eirbmon" />
                        <ItemLayout page="profil" primary="Profil" secondary="Utilisateur" />
                        <ItemLayout page="eirbdex" primary="Eirbdex" secondary="Eirbmons" />
                        <ItemLayout page="exchangeEirbmon" primary="Echange" secondary="Echanger vos eirbmons" />
                        <ItemLayout page="eirbmonsStore" primary="Boutique" secondary="Acheter ou vender vos eirbmons" />
                    </List>
                </div>
            </Drawer>
            <AppBar position="fixed" className={classes.appbar}>
                <Toolbar className={classes.root} variant="dense">
                    <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={() => setIsOpen(!isOpen)}>
                        <Menu />
                    </IconButton>
                    {currentPage}
                    <Typography variant="h6" color="inherit" className={classes.apptitle}>
                        <img src="LogoEirbmon.png" alt="logo" height="30px" className={classes.logo} />
                        Eirbmon
                    </Typography>
                    <IconButton
                        color="inherit"
                        edge="end"
                        aria-label="open drawer"
                        onClick={handleDrawerOpenChat}
                    >
                        <ChatBubbleIcon />
                    </IconButton>
                    <IconButton color="inherit" aria-label="ExitToAppIcon" onClick={() => disconnect(history)}>
                        <ExitToAppIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="right"
                open={openChat}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerCloseChat}>
                        <ArrowForwardIcon />
                    </IconButton>
                </div>
                <Divider />
                <div id="drawer-chat" />
            </Drawer>
        </div>
    );
};

Layout.propTypes = {
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

export default withRouter(withStyles(styles)(Layout));
