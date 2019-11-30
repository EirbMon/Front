import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import AppsIcon from '@material-ui/icons/Apps';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import { connect } from 'react-redux';

const styles = () => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    myEirbmons: {
        marginLeft: '5px',
    },
});

const ModalEirbmon = ({ classes, classeButton, children }) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className={classeButton}>
            <Button variant="contained" color="primary" onClick={handleOpen}>
                <AppsIcon />
                <Typography component="p" align="right" className={classes.myEirbmons}>
                    Mes eirbmons
                </Typography>
            </Button>
            <Modal
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    {children}
                </Fade>
            </Modal>
        </div>
    );
};

ModalEirbmon.propTypes = {
    classes: PropTypes.shape({
        modal: PropTypes.string,
        myEirbmons: PropTypes.string,
    }).isRequired,
    classeButton: PropTypes.string,
    children: PropTypes.node,
};

export default withStyles(styles)(connect(null)(ModalEirbmon));
