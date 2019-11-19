import classNames from 'classnames';
import { flowRight } from 'lodash/fp';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Typography, IconButton } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

import Eirbmon from './eirbmon';
import Page from '../../utils/layout';
import data from './data';
import API from '../../../api';

const styles = () => ({
    eirbdex: {
        maxWidth: '700',
        backgroundColor: 'grey',
        marginRight: 'auto',
        marginLeft: 'auto',
        top: 0,
        paddingTop: '1px',
        borderRadius: '5px',
        minHeight: '90vh',
        position: 'relative',
    },
    title: {
        backgroundColor: 'red',
        margin: '24px',
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: '20px',
        borderRadius: '15px',
        width: '200px',
    },
    eirbmons: {
        padding: '10px',
        marginRight: '0 !important',
        marginLeft: '0 !important',
    },
    eirbmon: {
        width: '150px',
        margin: '10',
        border: '1px solid #efefef',
        borderRadius: '4px',
        '&:hover, &:focus': {
            border: 'solid 1px',
        },
        paddingRight: '0 !important',
        paddingLeft: '0 !important',
    },
    media: {
        margin: '10 20 10 20',
        height: 75,
        backgroundColor: 'black',
    },
    eirbmonName: {
        padding: '0 !important',
    },
    level: {
        marginRight: '2px',
    },
    backButton: {
        position: 'absolute',
        right: '10px',
        top: '10px',
    },
});

const Eirbdex = ({ classes }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [eirbmon, setEirbmon] = useState(null);
    const [eirbmons, setEirbmons] = useState([]);

    // const eirbmons = [['1', 'pika', '0xae02198861390d15c15389672f0147bc8bf79b3b', '0', 'telecom', 'roulade', '100'],
    //     ['1', 'pika', '0xae02198861390d15c15389672f0147bc8bf79b3b', '0', 'telecom', 'roulade', '100'],
    // ];

    const { get } = API;
    get('http://localhost:4000/getMyEirbmon?account=0xe5B62D0e4349FB0d7Ebf019a2b7a9f8f9ec00D18')
        .then((res) => {
            console.log(res);

            if (res.length !== 0) {
                const eirbmonsForm = res.map((item) => {
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

                setEirbmons(eirbmonsForm);
                console.log(eirbmonsForm);
            }
        });

    // const eirbmonsForm = eirbmons.map((item) => {
    //     const pokemon = {
    //         id: item[0],
    //         name: item[1],
    //         adress: item[2],
    //         level: item[3],
    //         filiere: item[4],
    //         attack: item[5],
    //         pv: item[6],
    //     };

    //     return pokemon;
    // });

    return (
        <Page currentPage="Eirbdex">
            <div>
                <div className={classes.eirbdex}>
                    <Paper className={classes.title}>
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
                            {eirbmons.length !== 0 ? eirbmons.map((item, index) => {
                                const key = index;

                                return (
                                    <button
                                        key={key}
                                        type="button"
                                        onClick={() => {
                                            setEirbmon(item);
                                            setIsOpen(!isOpen);
                                        }}
                                        className={classNames('col-md-2', classes.eirbmon)}
                                    >
                                        <Card>
                                            <Typography component="p" align="right" className={classes.level}>
                                                Niveau
                                                {item.level}
                                            </Typography>
                                            <CardMedia
                                                className={classes.media}
                                                image=""
                                                title=""
                                            />
                                            <Typography component="h1" align="center">
                                                {item.name}
                                            </Typography>
                                        </Card>
                                    </button>
                                );
                            }) : null}
                        </div>
                    ) : (
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
                    )}
                </div>
            </div>
        </Page>
    );
};

Eirbdex.propTypes = {
    classes: PropTypes.shape({
        eirbmon: PropTypes.string,
        eirbmons: PropTypes.string,
        media: PropTypes.string,
        backButton: PropTypes.string,
        title: PropTypes.string,
        eirbdex: PropTypes.string,
        level: PropTypes.string,
        form: PropTypes.string,
    }).isRequired,
};

export default flowRight([
    withRouter,
    withStyles(styles),
])(Eirbdex);
