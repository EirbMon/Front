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
import mongoAccess from '../../../actions/withApi/index';
import reducerAcces from '../../../actions/withReducerOnly/index';
import instanciateContract from '../../../functions/instanciateContract';

import generateSignUpUrl from '../../../middleWare/generateSignUpUrl';
import logoEirbmon from '../../../scss/images/LogoEirbmon2.png';

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

const SignUp = ({ history, dispatch}) => {
    
    const classes = useStyles();
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
            dispatch(reducerAcces.DisplayMessage('errorPasswordVerification'));
        } else {
            instanciateContract.then(
                (res) => {
                    Object.assign(user, { owner_id: res.accounts[0] });
                    console.log(res.accounts);
                    var accountAddress =  res.accounts[0];
                    var contract = res.contract;
                    
                    console.log(dispatch);
                    contract.methods.initAccount().send({ from: accountAddress }).
                        then(res => {
                            console.log("here is result init account ", res);
                            sessionStorage.setItem('accountAddress', accountAddress);
                            dispatch(reducerAcces.SetAccountInfo(accountAddress));
                            dispatch(mongoAccess.GetOwnerEirbmon(accountAddress));
                            dispatch(mongoAccess.CheckInitAccount({ owner_id:  accountAddress}));
                            instanciateContract.then(res => {
                                dispatch(mongoAccess.GetBlockchainInfo({
                                    owner_id:  accountAddress,
                                    contract: contract,
                                }));
                            });
                        
                            dispatch(mongoAccess.SignUp(generateSignUpUrl, { ...user }))
                                .then(() => {
                                    const jwt = getJwt();
                                    if (jwt) {
                                        history.push('/profil');
                                    }
                                })
                          
                        });
                },
                (err) => {
                    console.error(err)
                }
            )

        }
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
                        S'inscrire à Eirbmon
                    </Typography>
                    <form className={classes.form} onSubmit={(e) => signUpFunction(e, form)}>
                        <TextField
                            id="name"
                            name="name"
                            label="Nom utilisateur"
                            value={form.name}
                            onChange={updateField}
                            margin="normal"
                            variant="outlined"
                            fullWidth
                            required
                            autoFocus
                        />
                        <TextField
                            id="email"
                            name="email"
                            label="Email de l'utilisateur"
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            autoComplete="email"
                            value={form.email}
                            onChange={updateField}
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
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="passwordCheck"
                            label="Vérification mot de passe"
                            type="password"
                            id="passwordCheck"
                            autoComplete="current-password"
                            value={form.passwordCheck}
                            onChange={updateField}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            S'inscrire
                        </Button>
                        <Grid container>
                            <Grid item xs>

                            </Grid>
                            <Grid item>
                                <Button onClick={() => history.push('/login')} size="small">
                                    {"Se connecter"}
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Grid>
        </Grid>
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
};

export default flowRight([
    withRouter,
    withStyles(useStyles),
    connect(),
])(SignUp);
