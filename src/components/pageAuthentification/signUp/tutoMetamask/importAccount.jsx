import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import images from '../../../../scss/images/index';

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

export default function ImportAccount({keyCode}) {
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
                    <Typography>2) Cliquez sur importer compte </Typography>
                </Grid>
                <Grid item >
                    <img src={images['metamaskAccessImportAccount']} width="60%" height="60%" alt='' style={{ marginLeft: 250 }} />
                </Grid>
                <Grid item>
                    <Typography>3) Entrez la clé privée suivante dans le champ indiqué: </Typography> 
                        <Paper elevation={3} style={{marginTop: 3, textAlign: 'center'}}> <Typography> {keyCode} </Typography> </Paper> 
                    
                </Grid>
                <Grid item >
                    <img src={images['metamaskImportAccount']} width="30%" height="30%" alt='' style={{ marginLeft: 300 }} />
                </Grid>
                <Grid item>
                    <Typography>4) Voila vous possédez un compte de bêta testeur avec 100 ethers</Typography>
                </Grid>
                <Grid item >
                    <img src={images['metamaskImportAccountSuccess']} width="60%" height="60%" alt='' style={{ marginLeft: 250 }} />
                </Grid>
            </Grid>

        </div>
    );
}
