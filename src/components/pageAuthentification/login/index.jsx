import { flowRight } from 'lodash/fp';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';


import getJwt from '../../../functions/getJwt';
import getWeb3 from './getWeb3';

import reducerAcces from '../../../actions/withReducerOnly/index';
import mongoAccess from '../../../actions/withApi/index';
import Blockchain from '../../../actions/withApi/blockchain';

import generateloginUrl from '../../../middleWare/generateLoginUrl';

import logoEirbmon from '../../../scss/images/LogoEirbmon2.png';
import instanciateContract from '../../../functions/instanciateContract';

const useStyles = makeStyles(theme => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: `url(${logoEirbmon})`,
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
        backgroundSize: 'auto',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));


const Login = ({ history, dispatch }) => {
    const classes = useStyles();
    const [form, setValues] = useState({
        email: '',
        password: '',
    });

    const updateField = (e) => {
        setValues({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    function getMetamaskUrlAndEirbmons() {
        return new Promise(

            async (resolve, reject) => {

                try {
                    // Get network provider and web3 instance.
                    const web3 = await getWeb3();

                    // Use web3 to get the user's accounts.
                    const accounts = await web3.eth.getAccounts();
                    const accountAddress = accounts[0];
                    console.log(accounts);

                    dispatch(reducerAcces.SetAccountInfo(accountAddress));
                    dispatch(mongoAccess.GetOwnerEirbmon(accountAddress));

                    console.log(Blockchain);
                    instanciateContract.then(res => {
                        dispatch(Blockchain({
                            owner_id: res.accounts[0],
                            contract: res.contract,
                        }));
                    });

                    resolve();
                } catch (error) {
                    // Catch any errors for any of the above operations.
                    alert(
                        `Failed to load web3, accounts, or contract. Check console for details.`,
                    );
                    console.error(error);
                    reject(error);
                }

            })
    }
    const loginFunction = (e, user) => {
        e.preventDefault();
        getMetamaskUrlAndEirbmons().then(
            () => {
                dispatch(mongoAccess.Login(generateloginUrl, user)).then(
                    () => {
                        const jwt = getJwt();
                        if (jwt) {
                            history.push('/profil');
                        }
                    })
            },
            (err) => {
                console.error(err)
            });
    };


    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Bienvenue sur EirbMon
            </Typography>
                    <form className={classes.form} onSubmit={(e) => loginFunction(e, form)}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email de l'utilisateur"
                            name="email"
                            autoComplete="email"
                            value={form.email}
                            onChange={updateField}
                            autoFocus
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Mot de passe"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={form.password}
                            onChange={updateField}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Se connecter
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Button onClick={() => history.push('/signUp')} size="small">
                                    Mot de passe oublié?
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button onClick={() => history.push('/signUp')} size="small">
                                    {"S'inscrire"}
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
};

Login.propTypes = {
    classes: PropTypes.shape({
        button: PropTypes.string,
        form: PropTypes.string,
        container: PropTypes.string,
        page: PropTypes.string,
    }).isRequired,
    history: PropTypes.shape({
        push: PropTypes.func,
    }),
    login: PropTypes.func,
};
export default flowRight([
    withRouter,
    withStyles(useStyles),
    connect(),
])(Login);