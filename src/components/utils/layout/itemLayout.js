import { ListItemText, ListItemIcon, ListItem } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import React from 'react';
import { withRouter } from "react-router-dom";

const ItemLayout = ({ page, primary, secondary, history }) => (
    <ListItem button onClick={() => { history.push(`/${page}`) }}>
        <ListItemIcon>
            <AccountCircle />
        </ListItemIcon>
        <ListItemText primary={primary} secondary={secondary} />
    </ListItem>
)

export default withRouter(ItemLayout);
