import classNames from 'classnames';
import { flowRight } from 'lodash/fp';
import { withStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Typography, IconButton } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Eirbmon from './eirbmon';
import EirbmonItem from './eirbmonItem';

const styles = (theme) => ({

    tableWrapper: {
        overflowX: 'auto',
        overflowY: 'hidden',
        padding: theme.spacing(3),
        margin: '48px auto 0 auto',
    },

    eirbdex: {
        backgroundColor: '#7398AE',
        width: '700px',
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
        maxHeight: '700px',
        width: '700px',
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

const Eirbdex = ({ classes, eirbmonsInfos }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [eirbmon, setEirbmon] = useState(null);

    console.log('eirbmonsInfos:');
    console.log(eirbmonsInfos);
    console.log('eirbmons:');
    console.log(eirbmonsInfos.eirbmons);

    var eirbmonsForm = null;

    try{
        eirbmonsForm = eirbmonsInfos.eirbmons.map(
        myEirbmon => {
            console.log(myEirbmon);
            return {
                id: myEirbmon.idInBlockchain,
                name: myEirbmon.name,
                type: myEirbmon.type,
                adress: myEirbmon.owner_id,
                level: myEirbmon.lvl,
                filiere: myEirbmon.field,
                attack: myEirbmon.skills,
                pv: myEirbmon.hp,
            }
        }
    )
    } catch{
        eirbmonsForm = [{
            id: eirbmonsInfos.eirbmons.idInBlockchain,
            name: eirbmonsInfos.eirbmons.name,
            type: eirbmonsInfos.eirbmons.type,
            adress: eirbmonsInfos.eirbmons.owner_id,
            level: eirbmonsInfos.eirbmons.lvl,
            filiere: eirbmonsInfos.eirbmons.field,
            attack:eirbmonsInfos.eirbmons.skills,
            pv: eirbmonsInfos.eirbmons.hp
        }
        ]
    }

    console.log(eirbmonsForm);

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
                                    type={item.type}
                                    level={item.level}
                                    id={item.id}
                                />
                            );
                        }) : null}
                    </div>
                ) : (
                    <div className={classNames('mx-auto', classes.selectedEirbmon)}>
                        <Eirbmon
                            name={eirbmon.name}
                            type={eirbmon.type}
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
    connect((state) => ({
        eirbmonsInfos: state.eirbmonsInfos,
    })),
    withStyles(styles),
])(Eirbdex);
