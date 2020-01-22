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
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';

import setImage from '../../utils/eirbdex/choisirImage';
import ethereumCoinImage from '../../../scss/images/EthereumCoin.png'

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

function EirbmonsList({ eirbmonsList, action, putEirbmonOnSale, putUnsaleEirbmon, updateOneEirbmon, blockchain }) {
    const classes = useStyles();
    console.log(eirbmonsList);
    let [openEirbmonDetail, setOpenEirbmonDetail] = useState(false);
    let [eirbmonDetail, setEirbmonDetail] = useState(null);
    let [eirbmonToSale, setEirbmonToSale] = useState(false);

    function showDetail(eirbmonInfo) {
        console.log(eirbmonInfo)
        setEirbmonDetail(eirbmonInfo);
        console.log(eirbmonDetail)
        setOpenEirbmonDetail(true);
    }

    function startSaleProcess() {
        setEirbmonToSale(true);
    }

    function saleMyEirbmon(eirbmonId) {
        blockchain.blockchain.contract.methods.ableSaleEirbmon(eirbmonId)
            .send({ from: sessionStorage.getItem('accountAddress') })
            .then(resp => {
                console.log("resp", resp);
                console.log("eirbmonId", eirbmonId);

                putEirbmonOnSale(eirbmonId)
            }).catch(error => console.log(error))
    }

    function saleMyEirbmonWithPrice(eirbmon) {
        console.log("eirbmon", eirbmon);
        blockchain.blockchain.contract.methods.saleEirbmon(eirbmon.idInBlockchain, eirbmon.price / 1000000000000000000)
            .send({ from: sessionStorage.getItem('accountAddress') })
            .then(resp => {
                console.log("resp", resp);
                console.log("eirbmon", eirbmon);

                putEirbmonOnSale(eirbmon.idInBlockchain)
            }).catch(error => console.log(error))
    }


    function cancelEirbmonSelling(eirbmonId) {
        blockchain.blockchain.contract.methods.cancelEirbmonSelling(eirbmonId)
            .send({ from: sessionStorage.getItem('accountAddress') })
            .then(resp => {
               // updateOneEirbmon(sessionStorage.getItem('accountAddress'), eirbmonId);
               putUnsaleEirbmon(eirbmonId);
            }).catch(error => console.log(error))
    }


    function buyEirbmon(eirbmon) {
        console.log("eirbmon", eirbmon);
        const eirbmonId = eirbmon.idInBlockchain;
        const value = eirbmon.price;
        blockchain.blockchain.contract.methods.byEirbmon(eirbmonId)
            .send({ from: sessionStorage.getItem('accountAddress'), value: value })
            .then(resp => {
                console.log("resp", resp);
                console.log("eirbmonId", eirbmonId);
                updateOneEirbmon(sessionStorage.getItem('accountAddress'), eirbmonId);
            }).catch(error => console.log(error))
    }

    function buttonAction(action, eirbmon) {

        switch (action) {
            case 'buy': {
                return <Button size="small" color="primary" onClick={() => buyEirbmon(eirbmon)} style={{ marginLeft: 20 }} > Acheter </Button>
            }

            case 'mine': {
                return <Button size="small" color="primary" onClick={() => { setEirbmonDetail(eirbmon); startSaleProcess(); }} style={{ marginLeft: 20 }} > Vendre </Button>
            }

            case 'sale': {
                return <Button size="small" color="primary" onClick={() => cancelEirbmonSelling(eirbmon.idInBlockchain)} style={{ marginLeft: 20 }} > Annuler </Button>
            }
        }
    }

    return (

        <div>

            <Grid container spacing={2} className={classes.eirbmon} >
                {eirbmonsList ?

                    eirbmonsList[0] != null && eirbmonsList.length > 0 ?

                        eirbmonsList.map(
                            (eirbmon, index) => {
                                console.log("eirbmonsList.length", eirbmonsList.length);
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

                                        {(action === 'buy' || action === 'sale') &&
                                            <Card className={classes.card}>
                                                <Grid container spacing={3}>
                                                    <Grid item xs={6}>
                                                        <Typography align="right" style={{ marginTop: 5 }}>
                                                            {eirbmon.price / 1000000000000000000}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={2}>
                                                        <CardMedia
                                                            style={{ height: 30, width: 30 }}
                                                            image={ethereumCoinImage}
                                                        />
                                                    </Grid>
                                                </Grid>

                                            </Card>
                                        }

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
                        <Grid item xs={12}>
                            <Card style={{ height: 150, position: "absolute", width: "100%", maxWidth: "80%" }}>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Aucun Eirbmon en vente
                                        </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    :
                    <Grid item xs={12}>
                        <Card style={{ height: 150, position: "absolute", width: "100%", maxWidth: "80%" }}>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Aucun Eirbmon en vente
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                }
            </Grid>


            {eirbmonDetail &&
                <Dialog open={openEirbmonDetail} onClose={() => setOpenEirbmonDetail(false)}>



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

                                <Grid item xs={12}>
                                    <Paper className={classes.paper}> Attaques </Paper>
                                </Grid>


                                <Grid item xs={6}>
                                    <Paper className={classes.paper}>{eirbmonDetail.skills[0].name}</Paper>
                                </Grid>
                                <Grid item xs={6}>
                                    <Paper className={classes.paper}>{eirbmonDetail.skills[1].name}</Paper>
                                </Grid>
                                <Grid item xs={6}>
                                    <Paper className={classes.paper}>{eirbmonDetail.skills[2].name}</Paper>
                                </Grid>



                            </Grid>
                        </DialogContent>
                    </Grid>


                </Dialog>
            }

            {eirbmonDetail &&
                <Dialog open={eirbmonToSale} onClose={() => { setEirbmonToSale(false) }} maxWidth='sm' fullWidth>
                    <DialogTitle id="form-dialog-title">Vente de {eirbmonDetail.name}</DialogTitle>
                    <DialogContent style={{ overflow: 'hidden' }}>

                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <DialogContentText>
                                    Prix de référence
                                </DialogContentText>

                                <Input
                                    id="standard-adornment-amount"
                                    disabled
                                    value={eirbmonDetail.value}
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <CardMedia
                                                style={{ height: 30, width: 30 }}
                                                image={ethereumCoinImage}
                                            />
                                        </InputAdornment>}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <DialogContentText>
                                    Veuillez indiquer votre prix de vente
                                </DialogContentText>

                                <Input
                                    id="standard-adornment-amount"
                                    value={eirbmonDetail.price / 1000000000000000000}
                                    onChange={(price) => { console.log("price", price.target.value); console.log(eirbmonDetail); setEirbmonDetail({ ...eirbmonDetail, price: +price.target.value * 1000000000000000000 }) }}
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <CardMedia
                                                style={{ height: 30, width: 30 }}
                                                image={ethereumCoinImage}
                                            />
                                        </InputAdornment>}
                                />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => { setEirbmonToSale(false); saleMyEirbmonWithPrice(eirbmonDetail) }}>Valider</Button>
                    </DialogActions>
                </Dialog>
            }


        </div>

    );
}

export default flowRight([
    connect((state, props) => ({
        blockchain: state.blockchain,
    }), {
        putEirbmonOnSale: mongoAccess.PutEirbmonOnSale,
        updateOneEirbmon: mongoAccess.UpdateOneEirbmon,
        putUnsaleEirbmon: mongoAccess.PutUnsaleEirbmon,
    }),
])(EirbmonsList);
