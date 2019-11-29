import classNames from 'classnames';
import { flowRight } from 'lodash/fp';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
import Pusher from 'pusher-js';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { lifecycle } from 'recompose';

import Page from '../../utils/layout/index';
import MyEirbmonListModal from './myEirbmonListModal';
import Informations from './informations';
import SalonClosed from './salonClosed';
import EirbmonToExchange from './eirbmonToExchange';

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
    const [myForm, setMyForm] = useState(pokemon);
    const [hisForm, setHisForm] = useState(pokemon);
    const [myChoose, setMyChoose] = useState(false);
    const [hisChoose, setHisChoose] = useState(false);
    const [display, setDisplay] = useState(false);
    const [spinner, setSpinner] = useState(true);
    const [hisName, setHisName] = useState('undefined');

    const channel = pusher.subscribe('presence-my-channel');

    channel.bind('pusher:subscription_succeeded', (members) => {
        setSpinner(false);
        setDisplay(true);

        members.each((member) => {
            if (member.info.name !== sessionStorage.getItem('email')) {
                setHisName(member.info.name);
            }
        });
    });

    channel.bind('pusher:subscription_error', () => {
        setSpinner(false);
        setDisplay(false);
    });

    channel.bind('pusher:member_added', (member) => {
        setMyForm(pokemon);
        setHisForm(pokemon);
        setMyChoose(false);
        setHisChoose(false);
        setHisName(member.info.name);
    });

    channel.bind('pusher:member_removed', () => setHisName('undefined'));

    channel.bind('client-pokemon', (data) => setHisForm(data));

    channel.bind('client-choose', (data) => setHisChoose(data.choose));

    channel.bind('client-exchangeMade', () => {
        alert('Echange a eu lieu');
        // history.push('/eirbdex');
    });

    const updateMyForm = (eirbmon) => {
        setMyForm(eirbmon);
        channel.trigger('client-pokemon', eirbmon);
    };

    const confirmerEchange = () => {
        if (pokemon === myForm) {
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
            {!spinner && display ? (
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
                                    <MyEirbmonListModal setMyForm={updateMyForm} selectedEirbmonId={myForm.id} classeButton={classes.modal} />
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
                                <EirbmonToExchange myEirbmon form={myForm} choose={myChoose} confirmerEchange={confirmerEchange} />
                            </div>
                            <div className={classNames('col')}>
                                <EirbmonToExchange form={hisForm} choose={hisChoose} />
                            </div>
                        </div>
                    ) : null}
                </div>
            ) : null}
            {!spinner && !display ? <SalonClosed /> : null}
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
};

export default flowRight([
    withRouter,
    withStyles(styles),
    connect(() => {
        const pusher = new Pusher('1584d8f85246e88b597f', {
            cluster: 'eu',
            forceTLS: true,
            authEndpoint: 'http://eirbmon.hopto.org:4000/pusher/auth',
            auth: {
                params: {
                    param1: sessionStorage.getItem('email'),
                    param2: 'vous pouvez mettre ce que vous voulez',
                },
            },
        });

        return ({
            pusher,
        });
    }),
    lifecycle({
        componentDidMount() {
            const { history, pusher } = this.props;
            history.listen(() => {
                console.log('je pars');
                pusher.unsubscribe('presence-my-channel');
            });
        },
    }),
])(ExchangeEirbmon);
