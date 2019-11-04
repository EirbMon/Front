import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

import Requetes from '../../../api/index';

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

const SignUp = ({ classes, history }) => {
    const [form, setValues] = useState({
        username: '',
        email: '',
        password: '',
    });

    const { post } = Requetes;

    const printValues = (e) => {
        e.preventDefault();
        console.log(form.username, form.password);
        post('https://localhost:8080/api/users', {
            username: form.username,
            password: form.password,
            email: form.email,
        })
            .then((json) => {
                post('https://localhost:8080/api/connexion', {
                    username: json.username,
                    password: json.password,
                })
                    .then((jsonCo) => {
                        if ('false' === jsonCo.check_user || 'false' === jsonCo.check_password) {
                            console.log('Cet utilisateur existe pas');
                        }

                        if (jsonCo.token) {
                            localStorage.setItem('token', jsonCo.token);
                            localStorage.setItem('username', form.username);
                            history.push('/profil');
                        }
                    });
            });
    };

    const updateField = (e) => {
        setValues({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className={classes.page}>
            <div className={classes.container}>
                <form onSubmit={printValues} className={classes.form}>
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
};

export default withRouter(withStyles(styles)(SignUp));
