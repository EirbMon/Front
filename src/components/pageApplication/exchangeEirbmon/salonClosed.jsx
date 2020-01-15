import { Typography, IconButton } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import React from 'react';

const SalonClosed = ({ leaveChannel }) => (
    <Typography variant="h3" color="inherit">
        Salon d&apos;échange fermé
        <IconButton aria-label="ExitToAppIcon" onClick={leaveChannel}>
            <ExitToAppIcon />
        </IconButton>
    </Typography>
);

export default SalonClosed;
