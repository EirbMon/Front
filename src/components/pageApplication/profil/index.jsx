import { flowRight } from 'lodash/fp';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Page from '../../utils/layout/index';
import ChatPortal from '../../utils/chat/chatPortal';

const styles = () => ({

    tableWrapper: {
        padding: '24px',
    },

    form: {
        display: 'inline',
    },
    page: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    },
    container: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
});

const Profil = ({ classes, accountInfo }) => (
    <Page currentPage="Profil">
        <ChatPortal salon="salonGlobal" />
        <div className={classes.page}>
            <div className={classes.container}>
                <TextField
                    name="username"
                    label="Nom utilisateur"
                    value={sessionStorage.getItem('name') || 'Unknown'}
                    margin="normal"
                    variant="outlined"
                    disabled
                    fullWidth
                />
                <TextField
                    name="username"
                    label="Email de l'utilisateur"
                    value={sessionStorage.getItem('email') || 'Unknown'}
                    margin="normal"
                    variant="outlined"
                    disabled
                    fullWidth
                />
                <TextField
                    name="username"
                    label="Numéro de compte"
                    value={accountInfo.accountUrl ? accountInfo.accountUrl.toLowerCase() : 'Unknown'}
                    margin="normal"
                    variant="outlined"
                    disabled
                    fullWidth
                />
            </div>
        </div>
    </Page>
)

Profil.propTypes = {
    classes: PropTypes.shape({
        page: PropTypes.string,
        container: PropTypes.string,
    }).isRequired,
};

export default flowRight([
    withRouter,
    connect((state) => ({
        accountInfo: state.accountInfo
    })),
    withStyles(styles),
])(Profil);
