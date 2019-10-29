import { flowRight } from 'lodash/fp';
import { withStyles } from "@material-ui/core/styles";
import { AppBar, Typography, IconButton, Drawer, Toolbar, ListItemText, ListItemIcon, ListItem, List } from '@material-ui/core';
import { AccountCircle, Menu } from '@material-ui/icons';
import React, { useState, Fragment, Children } from 'react';
import { withRouter, Route } from "react-router-dom";
import { lifecycle } from 'recompose';

import { checkAuthen } from '../functions/checkAuthen';
import Layout from './layout';

const styles = (theme) => ({
    tableWrapper: {
        overflowX: 'auto',
        padding: theme.spacing(3),
        maxWidth: 1200,
        margin: '50px auto 0 auto'
    },
});

const Tab = ({ currentPage, classes, children }) => (
    <div className="App">
        <Layout currentPage={currentPage} />
        <div className={classes.tableWrapper}>
            {children}
        </div>
    </div>
)

export default flowRight([
    withRouter,
    withStyles(styles),
    lifecycle({
        componentWillMount() {
            checkAuthen(this.props);
        },
    }),
])(Tab);
