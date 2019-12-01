import { flowRight } from 'lodash/fp';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import bcAccess from '../../../actions/withApi/index';
import generateSignUpUrl from '../../../middleWare/generateSignUpUrl';
import getJwt from '../../../functions/getJwt';

import logoEirbmon from '../../../scss/images/LogoEirbmon2.png';

const styles = () => ({
    form: {
        display: 'inline',
    },
    page: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundImage: `url(${logoEirbmon})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundColor: '#38b1e0',
    },
    container: {
        backgroundColor: 'grey',
        padding: '15px',
        opacity: '85%',
        borderRadius: '15px',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    button: {
        marginTop: '10px',
    },
});

const SignUp = ({ classes, history, signUp, displayMessage }) => {
    const [form, setValues] = useState({
        name: '',
        email: '',
        password: '',
        passwordCheck: '',
    });

    const updateField = (e) => {
        setValues({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const signUpFunction = (e, user) => {
        e.preventDefault();
        if (user.password !== user.passwordCheck) {
            displayMessage('errorPasswordVerification');
        } else {
            signUp(generateSignUpUrl, { ...user })
                .then(() => {
                    const jwt = getJwt();

                    if (jwt) {
                        history.push('/profil');
                    }
                });
        }
    };

    return (
        <div className={classes.page}>
            <div className={classes.container}>
                <form onSubmit={(e) => signUpFunction(e, form)} className={classes.form}>
                    <TextField
                        name="name"
                        label="Nom utilisateur"
                        value={form.name}
                        onChange={updateField}
                        margin="normal"
                        variant="outlined"
                        fullWidth
                        required
                    />
                    <TextField
                        name="email"
                        label="Adresse mail"
                        value={form.email}
                        onChange={updateField}
                        margin="normal"
                        variant="outlined"
                        type="email"
                        fullWidth
                        required
                    />
                    <TextField
                        name="password"
                        label="Mot de passe"
                        value={form.password}
                        onChange={updateField}
                        margin="normal"
                        variant="outlined"
                        type="password"
                        fullWidth
                        required
                    />
                    <TextField
                        name="passwordCheck"
                        label="Vérification mot de passe"
                        value={form.passwordCheck}
                        onChange={updateField}
                        margin="normal"
                        variant="outlined"
                        type="password"
                        fullWidth
                        required
                    />
                    <Button variant="contained" type="submit" className={classes.button} fullWidth>
                        S&apos;inscrire
                    </Button>
                    <Button
                        variant="outlined"
                        className={classes.button}
                        onClick={() => { history.push('/login'); }}
                        fullWidth
                    >
                        Se connecter
                    </Button>
                </form>
            </div>
        </div>
    );
};

SignUp.propTypes = {
    classes: PropTypes.shape({
        button: PropTypes.string,
        form: PropTypes.string,
        container: PropTypes.string,
        page: PropTypes.string,
    }).isRequired,
    history: PropTypes.shape({
        push: PropTypes.func,
    }),
    signUp: PropTypes.func,
    displayMessage: PropTypes.func,
};

export default flowRight([
    withRouter,
    withStyles(styles),
    connect(null, {
        signUp: bcAccess.SignUp,
        displayMessage: bcAccess.DisplayMessage,
    }),
])(SignUp);
