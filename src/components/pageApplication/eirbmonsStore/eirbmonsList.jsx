import React, { useState } from 'react';
import { flowRight } from 'lodash/fp';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { Dialog, Paper, DialogTitle, DialogActions, DialogContent, DialogContentText } from '@material-ui/core';

import setImage from '../../utils/eirbdex/choisirImage';

import mongoAccess from '../../../actions/withApi';

const useStyles = makeStyles(theme => ({
    eirbmon: {
        marginTop: 10,
        marginLeft: 10,
        width: 'auto',
        height: '500px',
        display: 'flex',
    },
    card: {
        width: '180px',
        border: '1px solid #efefef',
        borderRadius: '4px',
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
    paper: {
        textAlign: 'center',
        paddingTop: 10,
        paddingBottom: 10,
    },
}));

function EirbmonsList({ eirbmonsList, action, putEirbmonOnSale }) {
    const classes = useStyles();
    let [openEirbmonDetail, setOpenEirbmonDetail] = useState(false);
    let [eirbmonDetail, setEirbmonDetail] = useState(null);

    function showDetail(eirbmonInfo) {
        console.log(eirbmonInfo)
        setEirbmonDetail(eirbmonInfo);
        console.log(eirbmonDetail)
        setOpenEirbmonDetail(true);
    }

    function saleMyEirbmon(eirbmonId) {
        putEirbmonOnSale(eirbmonId)
    }

    function cancelEirbmonSelling() {

    }

    function buyEirbmon() {

    }

    function buttonAction(action, eirbmon) {

        switch (action) {
            case 'buy': {
                return <Button size="small" color="primary" onClick={() => buyEirbmon()} style={{ marginLeft: 20 }} > Acheter </Button>
            }

            case 'mine': {
                return <Button size="small" color="primary" onClick={() => saleMyEirbmon(eirbmon.idInBlockchain)} style={{ marginLeft: 20 }} > Vendre </Button>
            }

            case 'sale': {
                return <Button size="small" color="primary" onClick={() => cancelEirbmonSelling()} style={{ marginLeft: 20 }} > Annuler </Button>
            }
        }
    }

    return (

        <div>

            <Grid container spacing={2} className={classes.eirbmon} >
                {eirbmonsList ?

                    eirbmonsList.length > 0 &&

                    eirbmonsList.map(
                        (eirbmon, index) => {
                            const name = eirbmon.name;


                            return (
                                <Grid
                                    item
                                    key={index}
                                >

                                    <Card className={classes.card}>
                                        <Typography component="p" align="right" className={classes.level}>
                                            {`Niveau 0`}
                                        </Typography>
                                        <CardMedia
                                            className={classes.media}
                                            image={setImage(eirbmon.type)}
                                            title={name}
                                        />
                                        <Typography component="h1" align="center">
                                            {name}
                                        </Typography>
                                    </Card>
                                    <Card style={{ width: "180px" }}>
                                        <CardActions>
                                            <Button size="small" color="primary" onClick={() => showDetail(eirbmon)}>
                                                Voir
                                            </Button>
                                            {buttonAction(action, eirbmon)}
                                        </CardActions>
                                    </Card>
                                </Grid>
                            )
                        }
                    )
                    :
                    "Aucun eirbmons"
                }
            </Grid>


            <Dialog open={openEirbmonDetail} onClose={() => setOpenEirbmonDetail(false)}>

                {eirbmonDetail &&

                    <Grid
                        container
                        direction="column"
                        justify="center"
                        alignItems="center"
                    >


                        <DialogTitle>

                            {eirbmonDetail.name}

                        </DialogTitle>

                        <img
                            className={classes.media}
                            src={setImage(eirbmonDetail.type)}
                        />

                        <DialogContent style={{ height: 200 }}>
                            <Grid container spacing={3}>


                                <Grid item xs={6}>
                                    <Paper className={classes.paper}>Niveau: {eirbmonDetail.lvl}</Paper>
                                </Grid>
                                <Grid item xs={6}>
                                    <Paper className={classes.paper}>Filière: {eirbmonDetail.field}</Paper>
                                </Grid>



                                <Grid item xs={12}>
                                    <Paper className={classes.paper}>Pv: {eirbmonDetail.hp}</Paper>
                                </Grid>




                                <Grid item xs={6}>
                                    <Paper className={classes.paper}>Attaque 1 : {eirbmonDetail.skills_id[0]}</Paper>
                                </Grid>
                                <Grid item xs={6}>
                                    <Paper className={classes.paper}>Attaque 2 : {eirbmonDetail.skills_id[1]}</Paper>
                                </Grid>
                                <Grid item xs={6}>
                                    <Paper className={classes.paper}>Attaque 3 : {eirbmonDetail.skills_id[2]}</Paper>
                                </Grid>



                            </Grid>
                        </DialogContent>
                    </Grid>
                }

            </Dialog>

        </div>

    );
}

export default flowRight([
    connect(
        null, {
        putEirbmonOnSale: mongoAccess.PutEirbmonOnSale,
    }),
])(EirbmonsList);
