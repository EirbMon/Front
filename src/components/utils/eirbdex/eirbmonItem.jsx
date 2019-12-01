import classNames from 'classnames';
import { flowRight } from 'lodash/fp';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import React from 'react';
import ButtonBase from '@material-ui/core/ButtonBase';
import image from '../../../scss/images/pikachu-inverse.jpg';

const styles = () => ({
    card: {
        width: 150,
        border: '1px solid #efefef',
        borderRadius: '4px',
        '&:hover, &:focus': {
            border: 'solid 1px',
        },
        paddingLeft: '15px',
        paddingRight: '15px',
    },
    media: {
        margin: '20 20 20 20',
        height: 140,
    },

    level: {
        margin: '10 10 0 0',
    },
    item: {
        marginBottom: '10px',
    },
    selected: {
        border: 'solid 1px',
    },
});

const EirbmonItem = ({ name, level, onClick, classes, isSelected }) => {
    const levelTitle = `Niveau ${level}`;

    return (
        <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            className={classNames('col-md-3', classes.item)}
        >
            <ButtonBase
                centerRipple
                onClick={onClick}
            >
                <Card className={classNames(classes.card, { [classes.selected]: isSelected })}>
                    <Typography component="p" align="right" className={classes.level}>
                        {levelTitle}
                    </Typography>
                    <CardMedia
                        className={classes.media}
                        image={image}
                        title={name}
                    />
                    <Typography component="h1" align="center">
                        {name}
                    </Typography>
                </Card>
            </ButtonBase>
        </Grid>
    );
};

EirbmonItem.propTypes = {
    name: PropTypes.string,
    level: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    onClick: PropTypes.func,
    isSelected: PropTypes.bool,
    classes: PropTypes.shape({
        item: PropTypes.string,
        card: PropTypes.string,
        media: PropTypes.string,
        level: PropTypes.string,
        selected: PropTypes.string,
    }).isRequired,
};

export default flowRight([
    withStyles(styles),
])(EirbmonItem);
