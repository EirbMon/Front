import { withStyles } from "@material-ui/core/styles";
import { AppBar, Typography, IconButton, Drawer, Toolbar, ListItemText, ListItemIcon, ListItem, List } from '@material-ui/core';
import { AccountCircle, Menu } from '@material-ui/icons';
import React, { useState, Fragment } from 'react';
import { withRouter, Route } from "react-router-dom";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import ItemLayout from './itemLayout';
import { disconnect } from '../functions/disconnect';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  apptitle: {
    flexGrow: 1,
    textAlign: 'center'
  },
  menuButton: {
    marginLeft: -18,
    marginRight: 10,
  },
  appbar: {
    background: 'linear-gradient(to right, #0086C9, #4BC9EC);'
  },
  disconnectionButton: {
    position: 'absolute',
    right: '10px',
  },
});

const Layout = ({ currentPage, classes, history }) => {
  const [is_open, setIs_open] = useState(false);

  return (
    <Fragment>
      <Drawer open={is_open} onClose={() => setIs_open(!is_open)}>
        <div tabIndex={0} role="button" onClick={() => setIs_open(!is_open)} >
          <List component="nav" >
            <ItemLayout page="testBase" primary="Unity Basique" secondary="Bouton en jeux" />
            <ItemLayout page="testImplementation" primary="Projet Unity" secondary="Projet sur internet" />
            <ItemLayout page="unity" primary="Jeux" secondary="Eirbmon" />
            <ItemLayout page="profil" primary="Profil" secondary="Utilisateur" />
          </List>
        </div>
      </Drawer>
      <AppBar position="fixed" className={classes.appbar}>
        <Toolbar className={classes.root} variant="dense">
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={() => setIs_open(!is_open)}>
            <Menu />
          </IconButton>
          {currentPage}
          <Typography variant="h6" color="inherit" className={classes.apptitle}>
            Eirbmon
          </Typography>
          <IconButton className={classes.disconnectionButton} color="inherit" aria-label="ExitToAppIcon" onClick={() => disconnect(history)}>
            <ExitToAppIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Fragment>
  )
}

export default withRouter(withStyles(styles)(Layout));
