import { ListItemText, ListItemIcon, ListItem } from '@material-ui/core';
// import { AccountCircle } from '@material-ui/icons';
import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router-dom';

const ItemLayout = ({ page, primary, secondary, history, icon }) => (
    <ListItem button onClick={() => { history.push(`/${page}`); }}>
        <ListItemIcon>
            {icon}
        </ListItemIcon>
        <ListItemText primary={primary} secondary={secondary} />
    </ListItem>
);

ItemLayout.propTypes = {
    primary: PropTypes.string,
    secondary: PropTypes.string,
    page: PropTypes.string,
    history: PropTypes.shape({
        push: PropTypes.func,
    }),
};

export default withRouter(ItemLayout);
