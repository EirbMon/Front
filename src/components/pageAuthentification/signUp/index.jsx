import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CryptoJS from 'crypto-js';

import bcAccess from '../../../actions/index';
import generateSignUpUrl from '../../../middleWare/generateSignUpUrl';
import generateLoginUrl from '../../../middleWare/generateLoginUrl';

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
        backgroundImage: 'url("https://www.unesourisetmoi.info/data/medias/0291/pokemon.jpg")',
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

const SignUp = ({ classes, history, signUp, login }) => {
    const [form, setValues] = useState({
        username: '',
        email: '',
        password: '',
    });

    const updateField = (e) => {
        setValues({
            ...form,
            [e.target.name]: e.target.value,
        });

        const passwordCrypted = CryptoJS.AES.encrypt(form.password, 'secret key 123');
        console.log(passwordCrypted.toString());
    };

    const signUpFunction = (e, user) => {
        e.preventDefault();
        signUp(generateSignUpUrl(), { ...user })
            .then(() => login(generateLoginUrl(), form))
            .then(() => {
                history.push('/profil');
            });
    };

    return (
        <div className={classes.page}>
            <div className={classes.container}>
                <form onSubmit={(e) => signUpFunction(e, form)} className={classes.form}>
                    <TextField
                        name="username"
                        label="Nom utilisateur"
                        value={form.username}
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
                    <Button variant="contained" type="submit" className={classes.button} fullWidth>
                        S&apos;inscrire
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
    login: PropTypes.func,
};

export default connect(null, { signUp: bcAccess.SignUp, login: bcAccess.Login })(withRouter(withStyles(styles)(SignUp)));
