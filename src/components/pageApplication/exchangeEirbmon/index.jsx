import classNames from 'classnames';
import { flowRight } from 'lodash/fp';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { lifecycle } from 'recompose';

import Page from '../../utils/layout/index';
import getJwt from '../../../functions/getJwt';
import isEmpty from '../../../functions/isEmpty';
import SelectEirbmonModal from './selectEirbmonModal';
import Informations from './informations';
import SalonClosed from './salonClosed';
import Eirbmon from './eirbmon';

const styles = () => ({
    zone: {
        marginTop: '15px',
    },
    usersName: {
        marginTop: '10px',
    },
    spinner: {
        width: '200px',
        heigth: '200px',
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        left: 0,
        right: 0,
        margin: 'auto',
    },
});

const pokemon = {
    id: '---',
    name: '---',
    adress: '---',
    level: '---',
    filiere: '---',
    attack: '---',
    pv: '---',
    date: '---',
};

const ExchangeEirbmon = ({ classes, history, pusher }) => {
    const [myEirbmon, setMyEirbmon] = useState(pokemon);
    const [myChoose, setMyChoose] = useState(false);
    const [hisName, setHisName] = useState('undefined');
    const [hisEirbmon, setHisEirbmon] = useState(pokemon);
    const [hisChoose, setHisChoose] = useState(false);
    const [displaySalon, setDisplaySalon] = useState(false);
    const [spinner, setSpinner] = useState(true);

    const channel = pusher.subscribe('presence-my-channel');

    channel.bind('pusher:subscription_succeeded', (members) => {
        let timesUserIsConnected = 0;
        setSpinner(false);
        setDisplaySalon(true);

        members.each((member) => {
            if (member.info.name !== sessionStorage.getItem('email')) {
                setHisName(member.info.name);
            } else if (member.info.name === sessionStorage.getItem('email')) {
                timesUserIsConnected++;
            }
        });

        if (timesUserIsConnected >= 2) {
            pusher.unsubscribe('presence-my-channel');
            setDisplaySalon(false);
        }
    });

    channel.bind('pusher:subscription_error', () => {
        setSpinner(false);
        setDisplaySalon(false);
    });

    channel.bind('pusher:member_added', (member) => {
        if (member.info.name) {
            setMyEirbmon(pokemon);
            setHisEirbmon(pokemon);
            setMyChoose(false);
            setHisChoose(false);
            setHisName(member.info.name);
        }
    });

    channel.bind('pusher:member_removed', () => setHisName('undefined'));

    channel.bind('client-pokemon', (data) => setHisEirbmon(data));

    channel.bind('client-choose', (data) => setHisChoose(data.choose));

    channel.bind('client-exchangeMade', () => {
        alert('Echange a eu lieu');
        // history.push('/eirbdex');
    });

    const updateMyForm = (eirbmon) => {
        setMyEirbmon(eirbmon);
        channel.trigger('client-pokemon', eirbmon);
    };

    const confirmerEchange = () => {
        if (pokemon === myEirbmon) {
            alert('Selectionner un pokémon');
        } else {
            setMyChoose(!myChoose);
            channel.trigger('client-choose', { choose: !myChoose });
        }
    };

    useEffect(() => {
        if (hisChoose && myChoose) {
            alert('Echange a eu lieu');
            channel.trigger('client-exchangeMade', {}); // Callback function possible
            // history.push('/eirbdex');
        }
    }, [myChoose]);

    return (
        <Page currentPage="Echange">
            {spinner ? (
                <div className={classNames(classes.spinner)}>
                    <CircularProgress size={200} />
                </div>
            ) : null}
            {!spinner && displaySalon ? (
                <div>
                    <div className="row">
                        <div className="col-6">
                            <Typography variant="h3" color="inherit">
                                Salon d&apos;échange
                            </Typography>
                            {2 === channel.members.count ? (
                                <div>
                                    <p className={classes.usersName}>
                                        {`Echange en cours entre ${sessionStorage.getItem('email')} et ${hisName}`}
                                    </p>
                                    <SelectEirbmonModal setMyEirbmon={updateMyForm} selectedEirbmonId={myEirbmon.id} classeButton={classes.modal} />
                                </div>
                            ) : (
                                <p className={classes.usersName}>
                                    En attente d&apos;un nouveau utilisateur
                                </p>
                            )}
                        </div>
                        <div className="col-6">
                            <Informations />
                        </div>
                    </div>
                    {2 === channel.members.count ? (
                        <div className={classNames('row', classes.zone)}>
                            <div className={classNames('col')}>
                                <Eirbmon isMyEirbmon form={myEirbmon} choose={myChoose} confirmerEchange={confirmerEchange} />
                            </div>
                            <div className={classNames('col')}>
                                <Eirbmon form={hisEirbmon} choose={hisChoose} />
                            </div>
                        </div>
                    ) : null}
                </div>
            ) : null}
            {!spinner && !displaySalon ? <SalonClosed /> : null}
        </Page>
    );
};

ExchangeEirbmon.propTypes = {
    classes: PropTypes.shape({
        zone: PropTypes.string,
        usersName: PropTypes.string,
        spinner: PropTypes.string,
        modal: PropTypes.string,
    }).isRequired,
    history: PropTypes.shape({
        push: PropTypes.func,
    }),
    pusher: PropTypes.shape({
        subscribe: PropTypes.func,
        unsubscribe: PropTypes.func,
    }),
    channel: PropTypes.shape({
        bind: PropTypes.func,
        trigger: PropTypes.func,
        members: PropTypes.shape({
            count: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        }),
    }),
};

export default flowRight([
    withRouter,
    withStyles(styles),
    connect((state, props) => {
        const { history } = props;
        if (isEmpty(state.pusher)) {
            history.push('/profil');
        }

        const jwt = getJwt();

        if (!jwt) {
            history.push('/login');
        }

        return ({
            pusher: state.pusher.pusher,
        });
    }),
    lifecycle({
        componentDidMount() {
            const { history, pusher } = this.props;
            history.listen(() => {
                console.log('Quitte le salon');
                pusher.unsubscribe('presence-my-channel');
            });
        },
    }),
])(ExchangeEirbmon);
