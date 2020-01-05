import React, { useState } from 'react';
import { flowRight } from 'lodash/fp';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import { Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText } from '@material-ui/core';

import image from '../../../scss/images/pikachu-inverse.jpg';

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

}));

function EirbmonsList({ eirbmonsList, showDetail, action, putEirbmonOnSale }) {
    const classes = useStyles();
    let [openEirbmonDetail, setOpenEirbmonDetail] = useState(false)

    function showDetail() {
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
        
        switch(action){
            case 'buy':{
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
                    {
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
                                                image={image}
                                                title={name}
                                            />
                                            <Typography component="h1" align="center">
                                                {name}
                                            </Typography>
                                        </Card>
                                        <Card style={{ width: "180px" }}>
                                            <CardActions>
                                                <Button size="small" color="primary" onClick={() => showDetail()}>
                                                    Voir
                                                </Button>
                                                {buttonAction(action,eirbmon)}
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                )
                            }
                        )
                    }
                </Grid>

                <Dialog open={openEirbmonDetail} onClose={() => setOpenEirbmonDetail(false)}>
                    lol
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