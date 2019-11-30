import { Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';

import Eirbmon from '../../utils/eirbdex/eirbmon';

const styles = () => ({
    playerZone: {
        backgroundColor: '#829c68',
        paddingTop: '2px',
        borderRadius: '5px',
    },
    paper: {
        margin: '10px',
        padding: '10px',
    },
    button: {
        marginTop: '20px',
        paddingBottom: '10px',
        marginLeft: '10px',
        marginRight: '10px',
    },
});

const EirbmonToExchange = ({ classes, isMyEirbmon, form, choose, confirmerEchange }) => (
    <div className={classes.playerZone}>
        <Paper className={classes.paper} elevation={6}>
            <Typography variant="h5" component="h3">
                {isMyEirbmon ? 'Mon Eirbmon' : 'Son Eirbmon'}
            </Typography>
            <Typography component="p">
                {isMyEirbmon ? 'Le Eirbmon que je vais lui donner' : "Le Eirbmon qu'il va me donner"}
            </Typography>
        </Paper>
        <Eirbmon {...form} />
        <div className={classes.button}>
            <Button variant={choose ? 'contained' : 'outlined'} type="button" onClick={confirmerEchange} fullWidth>
                Prêt à l&apos;échange
            </Button>
        </div>
    </div>
);

EirbmonToExchange.propTypes = {
    classes: PropTypes.shape({
        playerZone: PropTypes.string,
        paper: PropTypes.string,
        button: PropTypes.string,
    }).isRequired,
    isMyEirbmon: PropTypes.bool,
    form: PropTypes.shape({}),
    choose: PropTypes.bool,
    confirmerEchange: PropTypes.func,
};

export default withStyles(styles)(EirbmonToExchange);
