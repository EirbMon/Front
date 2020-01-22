import { Typography, IconButton } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import React from 'react';

const ExchangeOvered = ({ leaveChannel, success, hisSuccess }) => {
    if (true === success && true === hisSuccess) {
        return (
            <div>
                <Typography variant="h3" color="inherit">
                    Echange terminé
                    <IconButton aria-label="ExitToAppIcon" onClick={leaveChannel}>
                        <ExitToAppIcon />
                    </IconButton>
                </Typography>
                Vous pouvez visualiser l&apos;eirbmon que vous venez d&apos;obtenir dans votre Eirbdex
            </div>
        );
    } if ((false === success && true === hisSuccess) || (true === success && false === hisSuccess) || (false === success && false === hisSuccess)) {
        return (
            <div>
                <Typography variant="h3" color="inherit">
                    Echange échoué
                    <IconButton aria-label="ExitToAppIcon" onClick={leaveChannel}>
                        <ExitToAppIcon />
                    </IconButton>
                </Typography>
                Un problème est survenu, l&apos;échange n&apos;a pas pu avoir lieu
            </div>
        );
    }

    return (
        <div>
            <Typography variant="h3" color="inherit">
                Echange en cours
                <IconButton aria-label="ExitToAppIcon" onClick={leaveChannel}>
                    <ExitToAppIcon />
                </IconButton>
            </Typography>
            En attente de l&apos;autre utilisateur
        </div>
    );
};

export default ExchangeOvered;
