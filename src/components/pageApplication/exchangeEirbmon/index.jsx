import { flowRight } from 'lodash/fp';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { lifecycle } from 'recompose';

import Page from '../../utils/layout/index';
import isEmpty from '../../../functions/isEmpty';
import reducerAcces from '../../../actions/withReducerOnly';
import ChatPortal from '../../utils/chat/chatPortal';
import Salon from './salon';

const styles = () => ({

    tableWrapper: {
        padding: '24px',
    },

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
            {!salon ? (
                <ChatPortal salon="salonGlobal" />
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
