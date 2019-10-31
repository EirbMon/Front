import React from 'react';
import { withSnackbar } from 'notistack';
import { connect } from 'react-redux';
import { withRouter, Route } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";

// Visual Items
import { AppBar, Typography, IconButton, Drawer, Toolbar, ListItemText, ListItemIcon, ListItem, List } from '@material-ui/core';
import { AccountCircle, Menu } from '@material-ui/icons';

import TestBase from '../testBase';
import TestImplementation from '../testImplementation';
import Game from '../game';

//////////////////////////////////////////////////// Class //////////////////////////////////////////////////
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
});


class AppComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      is_open: false,
      currentPage: "EirbMon",
      errorHandler: {
        timeStamp: new Date(),
      },
      successHandler: {
        timeStamp: new Date(),
      }
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.errorHandler.error) {

        if (props.errorHandler.timeStamp != state.errorHandler.timeStamp) {
            props.enqueueSnackbar(props.errorHandler.errorMessage, { variant: 'error' });
        }

        state.errorHandler = props.errorHandler;
    }

    if (props.successHandler.success) {

        if (props.successHandler.timeStamp != state.successHandler.timeStamp) {
            props.enqueueSnackbar(props.successHandler.successMessage, { variant: 'success' });
        }

        state.successHandler = props.successHandler;
    }
    return state;
}

  navigateTo(path, currentPage) {
    this.props.history.push(path);
    this.setState({currentPage: currentPage});
  }

  render() {
    const classes = this.props.classes;
    return (
      <div className="App">


        <Drawer open={this.state.is_open} onClose={() => this.setState({ is_open: false })}>
          <div tabIndex={0} role="button" onClick={() => this.setState({ is_open: false })} >
            <List component="nav" >

              <ListItem button onClick={() => { this.navigateTo('/testBase', "Unity Basique") }}>
                <ListItemIcon>
                  <AccountCircle />
                </ListItemIcon>
                  
                <ListItemText primary={'Unity Basique'} secondary={"Bouton en jeux"} />

              </ListItem>

              <ListItem button onClick={() => { this.navigateTo('/testImplementation', "Projet Unity") }}>
                <ListItemIcon>
                  <AccountCircle />
                </ListItemIcon>
                  
                <ListItemText primary={'Projet Unity'} secondary={"Projet sur internet"} />

              </ListItem>

              <ListItem button onClick={() => { this.navigateTo('/unity', "Jeux") }}>
                <ListItemIcon>
                  <AccountCircle />
                </ListItemIcon>
                  
                <ListItemText primary={'Jeux'} secondary={"Eirbmon"} />

              </ListItem>
            </List>

          </div>
        </Drawer>


        <AppBar position="fixed" className={classes.appbar}>
          <Toolbar className={classes.root} variant="dense">
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={() => this.setState({ is_open: true })}>
              <Menu />
            </IconButton>
            {this.state.currentPage}
            <Typography variant="h6" color="inherit" className={classes.apptitle}>
              Eirbmon
          </Typography>
          </Toolbar>
        </AppBar>



      </div>)
  }
} 

function mapStateToProps(state) {
  return {
    errorHandler: state.errorHandler,
    successHandler: state.successHandler,
  };
}

export default withRouter(connect(mapStateToProps)(withStyles(styles)(withSnackbar(AppComponent))));