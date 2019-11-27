import classNames from 'classnames';
import { flowRight } from 'lodash/fp';
import { withStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Typography, IconButton } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

import Eirbmon from './eirbmon';
import EirbmonItem from './eirbmonItem';

const styles = () => ({
    eirbdex: {
        backgroundColor: '#7398AE',
        width: '700',
        height: '880px',
        borderRadius: '60px',
        paddingTop: '20px',
        position: 'relative',
        overflow: 'hidden',
    },
    title: {
        backgroundColor: '#B1A296',
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: '20px',
        borderRadius: '15px',
        width: '200px',
    },
    eirbmons: {
        padding: '10px',
        paddingTop: '0 !important',
        marginTop: '20px',
        marginRight: '0 !important',
        marginLeft: '0 !important',
        paddingRight: '25px',
        overflowY: 'auto',
        height: '750px',
        position: 'absolute',
        right: '-17px',
    },
    backButton: {
        position: 'absolute',
        right: '50px',
        top: '20px',
    },
    selectedEirbmon: {
        paddingTop: '25px',
    },
});

const Eirbdex = ({ classes }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [eirbmon, setEirbmon] = useState(null);

    const eirbmons = [
        ['1', 'pika', '0xae02198861390d15c15389672f0147bc8bf79b3b', '0', 'telecom', 'roulade', '100'],
        ['1', 'pika', '0xae02198861390d15c15389672f0147bc8bf79b3b', '0', 'telecom', 'roulade', '100'],
        ['1', 'pika', '0xae02198861390d15c15389672f0147bc8bf79b3b', '0', 'telecom', 'roulade', '100'],
        ['1', 'pika', '0xae02198861390d15c15389672f0147bc8bf79b3b', '0', 'telecom', 'roulade', '100'],
        ['1', 'pika', '0xae02198861390d15c15389672f0147bc8bf79b3b', '0', 'telecom', 'roulade', '100'],
        ['1', 'pika', '0xae02198861390d15c15389672f0147bc8bf79b3b', '0', 'telecom', 'roulade', '100'],
        ['1', 'pika', '0xae02198861390d15c15389672f0147bc8bf79b3b', '0', 'telecom', 'roulade', '100'],
        ['1', 'pika', '0xae02198861390d15c15389672f0147bc8bf79b3b', '0', 'telecom', 'roulade', '100'],
        ['1', 'pika', '0xae02198861390d15c15389672f0147bc8bf79b3b', '0', 'telecom', 'roulade', '100'],
        ['1', 'pika', '0xae02198861390d15c15389672f0147bc8bf79b3b', '0', 'telecom', 'roulade', '100'],
        ['1', 'pika', '0xae02198861390d15c15389672f0147bc8bf79b3b', '0', 'telecom', 'roulade', '100'],
        ['1', 'pika', '0xae02198861390d15c15389672f0147bc8bf79b3b', '0', 'telecom', 'roulade', '100'],
        ['1', 'pika', '0xae02198861390d15c15389672f0147bc8bf79b3b', '0', 'telecom', 'roulade', '100'],
        ['1', 'pika', '0xae02198861390d15c15389672f0147bc8bf79b3b', '0', 'telecom', 'roulade', '100'],
    ];

    const eirbmonsForm = eirbmons.map((item) => {
        const pokemon = {
            id: item[0],
            name: item[1],
            adress: item[2],
            level: item[3],
            filiere: item[4],
            attack: item[5],
            pv: item[6],
        };

        return pokemon;
    });

    return (
        <div className="mx-auto">
            <Paper className={classNames('mx-auto', classes.eirbdex)}>
                <Paper className={classNames('mx-auto', classes.title)}>
                    <Typography variant="h5" component="h3" align="center">
                        Eirbdex
                    </Typography>
                </Paper>
                {isOpen ? (
                    <IconButton className={classes.backButton} color="inherit" aria-label="Back" onClick={() => setIsOpen(!isOpen)}>
                        <ArrowBackIcon />
                    </IconButton>
                ) : null}
                {!isOpen ? (
                    <div className={classNames('row', classes.eirbmons)}>
                        {eirbmonsForm.length !== 0 ? eirbmonsForm.map((item, index) => {
                            const key = index;

                            return (
                                <EirbmonItem
                                    onClick={() => {
                                        setEirbmon(item);
                                        setIsOpen(!isOpen);
                                    }}
                                    key={key}
                                    name={item.name}
                                    level={item.level}
                                />
                            );
                        }) : null}
                    </div>
                ) : (
                    <div className={classNames('mx-auto', classes.selectedEirbmon)}>
                        <Eirbmon
                            name={eirbmon.name}
                            image={eirbmon.image}
                            level={eirbmon.level}
                            xp={eirbmon.xp}
                            attack={eirbmon.attack}
                            date={eirbmon.date}
                            pv={eirbmon.pv}
                            filiere={eirbmon.filiere}
                        />
                    </div>
                )}
            </Paper>
        </div>
    );
};

Eirbdex.propTypes = {
    classes: PropTypes.shape({
        selectedEirbmon: PropTypes.string,
        eirbmons: PropTypes.string,
        backButton: PropTypes.string,
        title: PropTypes.string,
        eirbdex: PropTypes.string,
    }).isRequired,
};

export default flowRight([
    withRouter,
    withStyles(styles),
])(Eirbdex);
