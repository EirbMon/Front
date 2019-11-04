import { flowRight } from 'lodash/fp';
import { withSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';

const Snackbar = ({ children, enqueueSnackbar, errorHandler, successHandler }) => {
    useEffect(() => {
        if (errorHandler.error) {
            enqueueSnackbar(errorHandler.errorMessage, { variant: 'error' });
        }

        if (successHandler.success) {
            enqueueSnackbar(successHandler.successMessage, { variant: 'success' });
        }
    }, [errorHandler, successHandler]);

    return (
        <div>
            {children}
        </div>
    );
};

Snackbar.propTypes = {
    successHandler: PropTypes.shape({
        success: PropTypes.number,
        successMessage: PropTypes.string,
    }).isRequired,
    errorHandler: PropTypes.shape({
        error: PropTypes.number,
        errorMessage: PropTypes.string,
    }).isRequired,
    children: PropTypes.node,
    enqueueSnackbar: PropTypes.func,
};

export default flowRight([
    withSnackbar,
    connect((state) => ({
        errorHandler: state.errorHandler,
        successHandler: state.successHandler,
    })),
])(Snackbar);
