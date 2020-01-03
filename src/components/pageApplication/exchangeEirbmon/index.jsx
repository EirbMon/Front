import { flowRight } from 'lodash/fp';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { lifecycle } from 'recompose';
import ReactDOM from 'react-dom';

import Page from '../../utils/layout/index';
import isEmpty from '../../../functions/isEmpty';
import Button from '@material-ui/core/Button';
import reducerAcces from '../../../actions/withReducerOnly';
import Salon from './salon';
import ChatScreen from '../../utils/chat';

const styles = () => ({
    selectSalon: {
        width: '300px',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    button: {
        margin: '4px',
    }
});

const ExchangeEirbmon = ({ classes, pusher }) => {
    const [salon, setSalon] = useState(null);
    const [portalEl, setPortalEl] = useState(document.getElementById('drawer-chat'));
    var refreshId = setInterval(() => {
        if (document.getElementById('drawer-chat')) {
            setPortalEl(document.getElementById('drawer-chat'))
            clearInterval(refreshId);
            return 0
        }
    }, 100);

    const changeSalon = (salon) => {
        setSalon(salon);
    }

    const listSalon = () => (
        <div className={classes.selectSalon}>
            <Button className={classes.button} variant='outlined' type="button" onClick={() => changeSalon('salon1')} fullWidth>
                Salon n°1
            </Button>
            <Button className={classes.button} variant='outlined' type="button" onClick={() => changeSalon('salon2')} fullWidth>
                Salon n°2
            </Button>
            <Button className={classes.button} variant='outlined' type="button" onClick={() => changeSalon('salon3')} fullWidth>
                Salon n°3
            </Button>
        </div>
    );

    return (
        <Page currentPage="Echange">
            {isEmpty(pusher) ? (
                <div className="row">
                    <div className="col-6">
                        <Typography variant="h3" color="inherit">
                            Vous n&apos;êtes pas connecté
                        </Typography>
                    </div>
                </div>
            ) : null}
            {!isEmpty(pusher) ? (
                salon ? <Salon salon={salon} setSalon={setSalon} /> : listSalon()
            ) : null}
            {portalEl && !salon ? (
                ReactDOM.createPortal(
                    <ChatScreen chatChannel="70922fc5-3e1e-4330-ad62-4a301c07853c" />,
                    portalEl,
                )
            ) : null}
        </Page>
    );
};

ExchangeEirbmon.propTypes = {
    classes: PropTypes.shape({
        selectSalon: PropTypes.string,
    }).isRequired,
    pusher: PropTypes.shape({}),
};

export default flowRight([
    withRouter,
    withStyles(styles),
    connect((state) => ({
        pusher: state.pusher.pusher,
    }), {
        getPusherID: reducerAcces.GetPusherID,
    }),
    lifecycle({
        componentWillMount() {
            const { pusher, getPusherID } = this.props;
            if (isEmpty(pusher)) {
                getPusherID();
            }
        },
    }),
])(ExchangeEirbmon);
