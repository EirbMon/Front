import { flowRight } from 'lodash/fp';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';

import Page from '../../utils/layout/index';
import ChatScreen from '../../utils/chat';

const styles = () => ({
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

const Profil = ({ classes, accountInfo }) => {
    const [portalEl, setPortalEl] = useState(document.getElementById('drawer-chat'));
    var refreshId = setInterval(() => {
        if (document.getElementById('drawer-chat')) {
            setPortalEl(document.getElementById('drawer-chat'))
            clearInterval(refreshId);
            return 0
        }
    }, 100);

    return <Page currentPage="Profil">
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
                    value={accountInfo.accountUrl || 'Unknown'}
                    margin="normal"
                    variant="outlined"
                    disabled
                    fullWidth
                />
            </div>
        </div>
        {portalEl ? (
            ReactDOM.createPortal(
                <ChatScreen chatChannel="70922fc5-3e1e-4330-ad62-4a301c07853c" />,
                portalEl,
            )
        ) : null}
    </Page>
}

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
