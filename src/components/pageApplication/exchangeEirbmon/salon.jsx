import classNames from 'classnames';
import { flowRight } from 'lodash/fp';
import { withStyles } from '@material-ui/core/styles';
import { Typography, IconButton } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PropTypes from 'prop-types';
import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { lifecycle } from 'recompose';
import mongoAccess from '../../../actions/withApi/index';

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

const ExchangeEirbmon = ({ classes, history, pusher, blockchain,channel, dispatch, setSalon, salon, exchageEirbmons }) => {
    const [myEirbmon, setMyEirbmon] = useState(pokemon);
    const [myChoose, setMyChoose] = useState(false);
    const [hisName, setHisName] = useState('undefined');
    const [hisAccountAddress, setHisAccountAddress] = useState('undefined');
    const [hisEirbmon, setHisEirbmon] = useState(pokemon);
    const [hisChoose, setHisChoose] = useState(false);
    const [displaySalon, setDisplaySalon] = useState(false);
    const [spinner, setSpinner] = useState(true);


    channel.bind('pusher:subscription_succeeded', (members) => {
        setSpinner(false);
        setDisplaySalon(true);

        members.each((member) => {
            if (channel.members.me.id !== member.id) {
                setHisName(member.info.name);
                setHisAccountAddress(member.info.accountAddress);
            }
        });
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
            setHisAccountAddress(member.info.accountAddress);
        }
    });

    channel.bind('pusher:member_removed', () => setHisName('undefined'));

    channel.bind('client-pokemon', (data) => setHisEirbmon(data));

    channel.bind('client-choose', (data) => setHisChoose(data.choose));

    channel.bind('client-exchangeMade', () => {
        console.log('Echange a eu lieu');
        // history.push('/eirbdex');
    });

    const leaveChannel = () => {
        pusher.unsubscribe(`presence-${salon}`);
        setSalon(null);
    }

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
            console.log({
                "Mon id": sessionStorage.getItem('accountAddress'),
                "Son id": hisAccountAddress,
                "Son pokemon": hisEirbmon.id,
                "Mon pokemon": myEirbmon.id
            });

            //execute metamask transaction
            blockchain.blockchain.contract.methods.transferEirbmon(hisEirbmon.id, hisAccountAddress, myEirbmon.id, blockchain.blockchain.owner_id)
            .send({ from: sessionStorage.getItem('accountAddress') })
            .then(resp=>{
                //request bac server to update mongo database 
                exchageEirbmons({  id_eirbmon_blockchain_1: hisEirbmon.id,
                                                        id_eirbmon_blockchain_2: myEirbmon.id,
                                                        owner_id_1: hisAccountAddress,
                                                        owner_id_2: blockchain.blockchain.owner_id});                
                console.log('Echange a eu lieu');
                channel.trigger('client-exchangeMade', {}); // Callback function possible
                });
        }
    }, [myChoose]);

    return (
        <Fragment>
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
                                <IconButton aria-label="ExitToAppIcon" onClick={leaveChannel}>
                                    <ExitToAppIcon />
                                </IconButton>
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
            {!spinner && !displaySalon ? <SalonClosed leaveChannel={leaveChannel} /> : null}
        </Fragment>
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
};

export default flowRight([
    withRouter,
    withStyles(styles),
    connect((state, props) => ({
            pusher: state.pusher.pusher,
            channel: state.pusher.pusher.subscribe(`presence-${props.salon}`),
            blockchain: state.blockchain,
            // mongoAccess: state,
    }),  {
        exchageEirbmons: mongoAccess.ExchageEirbmons
    }),
    lifecycle({
        componentWillMount() {
            const { channel } = this.props;
            if (channel.subscribed === false) {
                channel.subscribe();
                channel.unbind('pusher:subscription_error'); // should not unbind in here
            }
        },
        componentDidMount() {
            const { history, pusher, salon } = this.props;
            history.listen(() => {
                console.log('Quitte le salon');
                pusher.unsubscribe(`presence-${salon}`);
            });
        },
    }),
])(ExchangeEirbmon);
