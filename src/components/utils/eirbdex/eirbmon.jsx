import { flowRight } from 'lodash/fp';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CardActions from '@material-ui/core/CardActions';
import PropTypes from 'prop-types';
import React from 'react';

const styles = () => ({
    container: {
        padding: '4px',
        border: 'solid 1px',
    },
    card: {
        width: 345,
        paddingLeft: '15px',
        paddingRight: '15px',
    },
    media: {
        margin: '20 20 20 20',
        height: 300,
    },
    paper: {
        textAlign: 'center',
        paddingTop: 10,
        paddingBottom: 10,
    },
    bottomText: {
        fontSize: 12,
    },
    eirbmonName: {
        marginBottom: 20,
        fontSize: 20,
        fontWeight: 600,
    },
});

const image = 'https://s3-ca-central-1.amazonaws.com/jeuxcanada-images/wp-content/uploads/2019/05/11093808/pikachu-inverse.jpg';

const Eirbmon = ({ name, level, xp, attack, date, filiere, pv, classes }) => {
    const levelTitle = `Niveau ${level}`;
    const dateTitle = `Date de capture : ${date}`;

    return (
        <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
        >
            <Card className={classes.card}>
                <Typography component="p" align="right">
                    {levelTitle}
                </Typography>
                <CardMedia
                    className={classes.media}
                    image={image}
                    title="Test"
                />
                <CardContent>
                    <Typography component="h1" align="center" className={classes.eirbmonName}>
                        {name}
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <Paper className={classes.paper}>{xp}</Paper>
                        </Grid>
                        <Grid item xs={6}>
                            <Paper className={classes.paper}>{attack}</Paper>
                        </Grid>
                        <Grid item xs={6}>
                            <Paper className={classes.paper}>{filiere}</Paper>
                        </Grid>
                        <Grid item xs={6}>
                            <Paper className={classes.paper}>{pv}</Paper>
                        </Grid>
                    </Grid>
                </CardContent>
                <CardActions>
                    <Typography component="p" className={classes.bottomText}>
                        {dateTitle}
                    </Typography>
                </CardActions>
            </Card>
        </Grid>
    );
};

Eirbmon.propTypes = {
    name: PropTypes.string,
    level: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    xp: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    attack: PropTypes.string,
    filiere: PropTypes.string,
    date: PropTypes.string,
    pv: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    classes: PropTypes.shape({
        container: PropTypes.string,
        bottomText: PropTypes.string,
        paper: PropTypes.string,
        media: PropTypes.string,
        eirbmonName: PropTypes.string,
        card: PropTypes.string,
    }).isRequired,
};

export default flowRight([
    withStyles(styles),
])(Eirbmon);
