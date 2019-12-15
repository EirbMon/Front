import { withStyles } from '@material-ui/core/styles';
import { flowRight } from 'lodash/fp';
import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import LayoutAccueil from './layoutAccueil';

const styles = (theme) => ({
    tableWrapper: {
        overflowX: 'auto',
        padding: theme.spacing(3),
        maxWidth: 1200,
        margin: '50px auto 0 auto',
    },
});

const PageAccueil = ({ currentPage, classes, children }) => (
    <div className="App">
        <LayoutAccueil currentPage={currentPage} />
        <div className={classes.tableWrapper}>
            {children}
        </div>
    </div>
);

/*
PageAccueil.propTypes = {
    classes: PropTypes.shape({
        tableWrapper: PropTypes.string,
    }).isRequired,
    children: PropTypes.node,
    currentPage: PropTypes.string,
    history: PropTypes.shape({
        push: PropTypes.func,
    }),
};*/

export default flowRight([
    withRouter,
    withStyles(styles),
    connect((state) => ({
        accountAddress: state.accountAddress,
    })),
])(PageAccueil);
