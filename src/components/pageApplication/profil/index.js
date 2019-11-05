import { flowRight } from 'lodash/fp';
import { withStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import React, { useState } from 'react';
import { withRouter } from "react-router-dom";

import Requetes from '../../../api/index';

import Page from '../../utils/layout';

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
        username: localStorage.getItem("username"),
        //email: 'pokemon@free.fr',
    });

    const { get } = Requetes;

    const printValues = (e) => {
        e.preventDefault();
        console.log(form.username, form.password);
        console.log(get("https://api.chucknorris.io/jokes/random").then((e) => console.log(e)));
    };

    return (
        <Page currentPage="Profil">
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
                </div>
            </div>
        </Page>
    );
}

export default flowRight([
    withRouter,
    withStyles(styles),
])(Profil);
