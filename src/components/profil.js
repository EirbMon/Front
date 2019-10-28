import { flowRight } from 'lodash/fp';
import { withStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import React, { useState } from 'react';
import { withRouter, Route, Switch } from "react-router-dom";
import { lifecycle } from 'recompose';

import Requetes from '../api/index';
import { getJwt } from './functions/getJwt';
import Layout from './utils/layout';

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
    },
    container: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        marginLeft: 'auto',
        marginRight: 'auto',
    }
});

const Profil = ({ classes }) => {
    const [form, setValues] = useState({
        username: 'Sacha',
        email: 'pokemon@free.fr',
    });

    const { get } = Requetes;

    const printValues = (e) => {
        e.preventDefault();
        console.log(form.username, form.password);
        console.log(get("https://api.chucknorris.io/jokes/random").then((e) => console.log(e)));
    };

    const updateField = (e) => {
        setValues({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="App">
            <Layout currentPage="Profil" />
            <div className={classes.page}>
                <div className={classes.container}>
                    <TextField
                        name="username"
                        label="Nom utilisateur"
                        value={form.username}
                        margin="normal"
                        variant="outlined"
                        disabled
                        fullWidth
                    />
                    <TextField
                        name="email"
                        label="Adresse mail"
                        value={form.email}
                        margin="normal"
                        variant="outlined"
                        disabled
                        fullWidth
                    />
                </div>
            </div>
        </div>
    );
}

export default flowRight([
    withRouter,
    withStyles(styles),
    lifecycle({
        componentWillMount() {
            const jwt = getJwt();
            const { history } = this.props;

            if (!jwt) {
                console.log('pas connecté');
                //history.push('/signup');
            }
        },
    }),
])(Profil);
