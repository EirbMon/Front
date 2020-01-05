import { withStyles } from '@material-ui/core/styles';
import { flowRight } from 'lodash/fp';
import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { lifecycle } from 'recompose';

import reducerAcces from '../../../actions/withReducerOnly/index';
import mongoAccess from '../../../actions/withApi/index';

import generateCheckTokenUrl from '../../../middleWare/generateCheckTokenUrl';
import instanciateContract from '../../../functions/instanciateContract';
import getJwt from '../../../functions/getJwt';
import Layout from './layout';

const styles = (theme) => ({
    tableWrapper: {
        overflowX: 'auto',
        overflowY: 'hidden',
        //padding: theme.spacing(3),
        //maxWidth: 1200,
        margin: '48px auto 0 auto',
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
    history: PropTypes.shape({
        push: PropTypes.func,
    }),
};

export default flowRight([
    withRouter,
    withStyles(styles),
    connect((state) => ({
        accountInfo: state.accountInfo,
    }),
        {
            setAccountInfo: reducerAcces.SetAccountInfo,
            getOwnerEirbmon: mongoAccess.GetOwnerEirbmon,
            getBlockchainInfo: mongoAccess.GetBlockchainInfo,
            checkToken: mongoAccess.CheckToken,
        }),
    lifecycle({
        componentWillMount() {
            const jwt = getJwt();
            const { checkToken, history, getOwnerEirbmon, setAccountInfo, getBlockchainInfo, accountInfo } = this.props;

            checkToken(generateCheckTokenUrl, { token: jwt })
                .then((res) => {
                    if (403 === res) {
                        history.push('/login');
                    }
                });

            if (!accountInfo.accountUrl) {
                const accountAddress = sessionStorage.getItem('accountAddress');
                setAccountInfo(accountAddress);
                getOwnerEirbmon(accountAddress);
                instanciateContract.then(res => {
                    getBlockchainInfo({
                        owner_id: res.accounts[0],
                        contract: res.contract,
                    });
                });
            }
        },
    }),
])(Page);
