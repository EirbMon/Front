import { withStyles } from '@material-ui/core/styles';
import { flowRight } from 'lodash/fp';
import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router-dom';
import { lifecycle } from 'recompose';

import checkAuthen from '../../../functions/checkAuthen';
import Layout from './layout';

const styles = (theme) => ({
    tableWrapper: {
        overflowX: 'auto',
        padding: theme.spacing(3),
        maxWidth: 1200,
        margin: '50px auto 0 auto',
    },
});

const Page = ({ currentPage, classes, children }) => (
    <div className="App">
        <Layout currentPage={currentPage} />
        <div className={classes.tableWrapper}>
            {children}
        </div>
    </div>
);

Page.propTypes = {
    classes: PropTypes.shape({
        tableWrapper: PropTypes.string,
    }).isRequired,
    children: PropTypes.node,
    currentPage: PropTypes.string,
};

export default flowRight([
    withRouter,
    withStyles(styles),
    // lifecycle({
    //     componentWillMount() {
    //         checkAuthen(this.props);
    //     },
    // }),
])(Page);
