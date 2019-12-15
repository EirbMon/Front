import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import images from '../../../../scss/images/index';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        marginTop: 5,
        marginBottom: 5,
    },
    imageCenter: {
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    detailPanel: {
        display: 'block',
        overflowY: 'scroll',
        height: 300
    },
}));

var metamaskLink = [
    {
        name: 'chrome',
        link: 'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=fr',
        title: 'Installation Chrome',
        image: images['metamaskChrome']
    },
    {
        name: 'mozilla',
        link: 'https://addons.mozilla.org/en-US/firefox/addon/ether-metamask/',
        title: 'Installation Mozilla Firefox',
        image: images['metamaskMozilla']
    }
]

export default function InstallMetamask() {
    const classes = useStyles();
    let [expandPanel, setExpandPanel] = useState({ name: 'panel' });

    const changePanelState = (panel) => {
        if (expandPanel.name === panel) { // i close the expanded row
            setExpandPanel({ name: 'panel' });
        } else {
            setExpandPanel({ name: panel });
        }
    }
    console.log(expandPanel.name)
    return (
        <div className={classes.root}>
            <br />
            {metamaskLink.map(
                (browser, i) => {
                    console.log(browser);
                    return (
                        <ExpansionPanel key={i} expanded={expandPanel.name === browser.name}
                            TransitionProps={{ unmountOnExit: true }}
                            onChange={() => changePanelState(browser.name)} >
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>

                                <Box display="flex" alignItems="center">
                                    <Box color="primary.main" >
                                        <Typography variant="caption" color="inherit" style={{ fontSize: 11 }}>
                                            {browser.title}
                                        </Typography>
                                    </Box>
                                </Box>

                            </ExpansionPanelSummary>

                            <ExpansionPanelDetails className="infospanel" className={classes.detailPanel}>
                                <Grid
                                    container
                                    direction="column"
                                    justify="center"
                                    alignItems="flex-start"
                                    spacing={3}
                                >
                                    <Grid item>
                                        <Typography>1) Cliquez sur ce lien: <a href={browser.link} target="_blank" rel="noopener noreferrer"> metamask </a> </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography>2) Ajouter l'extension à votre naviguateur comme montré ci-dessous: </Typography>
                                    </Grid>
                                    <Grid item className={classes.imageCenter}>
                                        <img src={browser.image} width="100%" height="100%" alt=''/>
                                    </Grid>
                                    <Grid item>
                                        <Typography>3) Une fois l'extension ajoutée, vous apercevrez l'icone suivante: </Typography>
                                    </Grid>
                                    <Grid item className={classes.imageCenter}>
                                        <img src={images['metamaskIcone']} width="100%" height="100%" alt=''/>
                                    </Grid>

                                </Grid>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    )
                })
            }
            <br />
            <Typography variant="caption"> *Metamask est une application permettant de gerer votre wallet.</Typography>
            <br />
            <Typography variant="caption"> *Un wallet est un outil qui permet de gerer vos ethers (la monnaie de la blockchain ethereum)</Typography>

        </div>
    );
}
