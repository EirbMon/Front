import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import images from '../../../../scss/images/tutorial/index';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        marginTop: 10,

    },
    imageCenter: {
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    tuto: {
        display: 'block',
        overflowY: 'scroll',
        height: 400
    }
}));

export default function ConfigMetamask() {
    const classes = useStyles();
    return (
        <div className={classes.root}>

            <Grid
                container
                spacing={3}
                className={classes.tuto}
            >
                <Grid item>
                    <Typography>1) Cliquez sur l'icone suivante: </Typography>
                </Grid>
                <Grid item>
                    <img src={images['metamaskIcone']} width="100%" height="100%" alt='' />
                </Grid>
                <Grid item>
                    <Typography>2) Créez un portefeuille qui contiendra votre ether, puis suivez les étapes de création du portefeuille. </Typography>
                </Grid>
                <Grid item >
                    <img src={images['metamaskCreerPortefeuille']} width="60%" height="60%" alt='' style={{ marginLeft: 250 }} />
                </Grid>
                <Grid item>
                    <Typography>3) Cliquez sur RPC Personalisé</Typography>
                </Grid>
                <Grid item >
                    <img src={images['metamaskAccessConfig']} width="60%" height="60%" alt='' style={{ marginLeft: 250 }} />
                </Grid>
                <Grid item>
                    <Typography>4) Entrez l'url suivante: HTTP://eirbmon.hopto.org:8545 puis enregistrez</Typography>
                </Grid>
                <Grid item >
                    <img src={images['metamaskConfigRpc']} width="60%" height="60%" alt='' style={{ marginLeft: 250 }} />
                </Grid>
                <Grid item>
                    <Typography>5) Voila le réseaux est ajouté. Maintenant vérifiez bien que vous êtes sur le bon réseaux</Typography>
                </Grid>
                <Grid item >
                    <img src={images['metamaskCheckCo']} width="60%" height="60%" alt='' style={{ marginLeft: 250 }} />
                </Grid>
            </Grid>

        </div>
    );
}
