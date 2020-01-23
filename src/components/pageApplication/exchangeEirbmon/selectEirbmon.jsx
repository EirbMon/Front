import classNames from 'classnames';
import { flowRight } from 'lodash/fp';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import EirbmonItem from '../../utils/eirbdex/eirbmonItem';

const styles = () => ({
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
    },
    selectedEirbmon: {
        paddingTop: '25px',
    },
});

const Eirbdex = ({ classes, setMyEirbmon, selectedEirbmonId, eirbmonsInfos }) => {
    const [selectedEirbmon, setSelectedEirbmon] = useState(selectedEirbmonId);
    const eirbmonsForm = eirbmonsInfos.eirbmons.map(
        myEirbmon => {
            return {
                id: myEirbmon.idInBlockchain,
                name: myEirbmon.name,
                type: myEirbmon.type,
                adress: myEirbmon.owner_id,
                level: myEirbmon.lvl,
                filiere: myEirbmon.field,
                attack: "roulade",
                pv: myEirbmon.hp,
            }
        }
    );

    return (
        <div className="mx-auto">
            <Paper className={classNames('mx-auto', classes.eirbdex)}>
                <Paper className={classNames('mx-auto', classes.title)}>
                    <Typography variant="h5" component="h3" align="center">
                        Eirbdex
                    </Typography>
                </Paper>
                <div className={classNames('row', classes.eirbmons)}>
                    {eirbmonsForm.length !== 0 ? eirbmonsForm.map((item, index) => {
                        const key = index;

                        return (
                            <EirbmonItem
                                onClick={() => {
                                    setMyEirbmon(item);
                                    setSelectedEirbmon(item.id);
                                }}
                                key={key}
                                name={item.name}
                                level={item.level}
                                isSelected={item.id === selectedEirbmon}
                            />
                        );
                    }) : null}
                </div>
            </Paper>
        </div>
    );
};

Eirbdex.propTypes = {
    classes: PropTypes.shape({
        selectedEirbmon: PropTypes.string,
        eirbmons: PropTypes.string,
        title: PropTypes.string,
        eirbdex: PropTypes.string,
    }).isRequired,
    selectedEirbmonId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    setMyEirbmon: PropTypes.func,
};

export default flowRight([
    withRouter,
    withStyles(styles),
    connect((state) => ({
        eirbmonsInfos: state.eirbmonsInfos,
    })),
])(Eirbdex);
