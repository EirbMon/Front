import { flowRight } from 'lodash/fp';
import { withStyles, makeStyles } from '@material-ui/core/styles';
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
import TutoMetamask from './tutoMetamask/index';
import { Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText } from '@material-ui/core';

import getJwt from '../../../functions/getJwt';
import mongoAccess from '../../../actions/withApi/index';
import reducerAcces from '../../../actions/withReducerOnly/index';
import instanciateContract from '../../../functions/instanciateContract';

import generateSignUpUrl from '../../../middleWare/generateSignUpUrl';
import generateCreateUserChatkitUrl from '../../../middleWare/generateCreateUserChatkitUrl';
import logoEirbmon from '../../../scss/images/LogoEirbmon2.png';
import { resolve } from 'url';


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
    modal: {
        margin: '2%',
        overflow: 'hidden'
    }
}));

const SignUp = ({ history, signUp, displayMessage, setAccountInfo,
    getBlockchainInfo, checkInitAccount, getKey, updateKey, createUserChatkit }) => {

    const classes = useStyles();
    const [form, setValues] = useState({
        name: '',
        email: '',
        password: '',
        passwordCheck: '',
    });

    const [modalState, setModalState] = useState({
        openTuto: false,
        openAskTuto: true
    });

    const [key, setKey] = useState({
        owner_id: '',
        code: '',
        available: true
    })


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
            instanciateContract.then(
                (res) => {
                    const accountAddress = res.accounts[0];
                    const contract = res.contract;
                    console.log(accountAddress);
                    Object.assign(user, { owner_id: accountAddress });
                    //execute metamask transaction
                    contract.methods.initAccount().send({ from: accountAddress }).
                        then(
                            res => {
                                console.log('ok1')
                                //store blockchain data
                                sessionStorage.setItem('accountAddress', accountAddress);
                                setAccountInfo(accountAddress);
                                instanciateContract.then(res => {
                                    getBlockchainInfo({
                                        owner_id: accountAddress,
                                        contract: contract,
                                    });
                                });
                                //update mongodb
                                checkInitAccount({ owner_id: accountAddress }).then(() => {
                                    signUp(generateSignUpUrl, { ...user })
                                        .then(() => {
                                            updateKey({ key: key.code, available: false, owner_id: accountAddress }).then(
                                                () => {
                                                    const jwt = getJwt();
                                                    if (jwt) {
                                                        createUserChatkit(generateCreateUserChatkitUrl, { 'username': user.email })
                                                        history.push('/profil');
                                                    }
                                                }
                                            )
                                        })
                                })
                            });
                }
            ).catch(
                (err) => {
                    console.error(err)
                })
        }
    }

    const getAvailableKey = () => {
        getKey().then(
            (data) => {
                setKey({ code: data.key });
                Promise.resolve()
            }).catch(err => { console.error(err); Promise.reject() })
    }


    const handleModalState = (modalName = '') => {

        if (modalName === "tuto") {
            setModalState({
                openTuto: !modalState.openTuto,
                openAskTuto: false
            })
        }
        else if (modalName === "askTuto") {
            setModalState({
                openAskTuto: !modalState.openAskTuto,
                openTuto: false
            })
        } else {
            setModalState({
                openTuto: false,
                openAskTuto: false
            })
        }

    }

    return (
        <div>
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
                                    <Button onClick={() => {
                                        new Promise((resolve) => resolve(getAvailableKey()))
                                            .then(() => handleModalState("tuto"))
                                            .catch(err => console.error(err))}}
                                        size="small">
                                        {"Tutoriel"}
                                    </Button>
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

            <Dialog open={modalState.openAskTuto} onClose={() => handleModalState()}>
                <DialogTitle className={classes.large}> Installation de Metamask Necessaire ! </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Pour utiliser l'application Eirbmon, l'utilisation de metamask est necessaire.
                        Ainsi un tutoriel est disponible pour vous guider lors de son installation.
                        Si vous avez déja metamask de configuré, vous pouvez passer ce tutoriel.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => {
                            new Promise(
                                (resolve) => resolve(getAvailableKey()))
                                .then(() => handleModalState("tuto"))
                                .catch(err => console.error(err))
                        }}
                        color="primary">
                        Continuer
                    </Button>
                    <Button onClick={() => handleModalState()} color="secondary">
                        Passer
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog fullWidth={true} maxWidth='xl' open={modalState.openTuto}
                onClose={() => handleModalState()} className={classes.modal}>
                <TutoMetamask
                    handleModalState={() => handleModalState()}
                    keyCode={key.code}
                />
            </Dialog>


        </div >
    );
};

SignUp.propTypes = {
    classes: PropTypes.shape({
        button: PropTypes.string,
        form: PropTypes.string,
        container: PropTypes.string,
        page: PropTypes.string,
    }),
    history: PropTypes.shape({
        push: PropTypes.func,
    }),
    signUp: PropTypes.func,
};

export default flowRight([
    withRouter,
    withStyles(useStyles),
    connect(
        null, {
        getBlockchainInfo: mongoAccess.GetBlockchainInfo,
        setAccountInfo: reducerAcces.SetAccountInfo,
        checkInitAccount: mongoAccess.CheckInitAccount,
        signUp: mongoAccess.SignUp,
        displayMessage: mongoAccess.DisplayMessage,
        getKey: mongoAccess.GetKey,
        updateKey: mongoAccess.UpdateKey,
        createUserChatkit: mongoAccess.CreateUserChatkit,
    }),
])(SignUp);
