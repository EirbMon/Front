import { withStyles } from '@material-ui/core/styles';
import { flowRight } from 'lodash/fp';
import React from 'react';
import { connect } from 'react-redux';

import CircularProgress from '@material-ui/core/CircularProgress';
import { Dialog } from '@material-ui/core';
import DialogContent from '@material-ui/core/DialogContent';

const styles = (theme) => ({
    box: {
        overflow: 'hidden',
    },
});

const Loading = ({ classes, loading }) => (
    <Dialog  open={loading.status}
        maxWidth='xs'>

        <DialogContent className={classes.box}>
            <CircularProgress />
        </DialogContent>

    </Dialog>
);


export default flowRight([
    withStyles(styles),
    connect((state) => ({
        loading: state.loading,
    })),
])(Loading);
