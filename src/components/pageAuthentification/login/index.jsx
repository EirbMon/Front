import { flowRight } from 'lodash/fp';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import getJwt from '../../../functions/getJwt';
import getWeb3 from './getWeb3';

import reducerAcces from '../../../actions/withReducerOnly/index';
import mongoAccess from '../../../actions/withApi/index';

import generateGetEirbmonUrl from '../../../middleWare/generateGetEirbmonUrl';
import generateloginUrl from '../../../middleWare/generateLoginUrl';

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


const Login = ({ classes, history, dispatch }) => {
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
                    console.log('ok');
                    // Get network provider and web3 instance.
                    const web3 = await getWeb3();
                    console.log('ok1');
                    // Use web3 to get the user's accounts.
                    const accounts = await web3.eth.getAccounts();
                    const accountAddress = accounts[0];
                    console.log(accounts);
                    console.log('ok2');

                    dispatch(reducerAcces.SetAccountInfo(accountAddress));
                    dispatch(mongoAccess.GetEirbmon(generateGetEirbmonUrl(accountAddress)));
                    console.log('ok3');
                    resolve();
                } catch (error) {
                    // Catch any errors for any of the above operations.
                    console.error(error);
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
        console.log("ire");
        getMetamaskUrlAndEirbmons().then(
            () => {
                console.log('heuuu')
                dispatch(mongoAccess.Login(generateloginUrl, user)).then(
                    () => {
                        console.log('yesss')
                        const jwt = getJwt();
                        if (jwt) {
                            history.push('/profil');
                        }
                    })
            },
            (err)=>{
                console.error(err)
            });
        console.log("ire");
    };


    return (
        <div className={classes.page}>
            <div className={classes.container}>
                <form onSubmit={(e) => loginFunction(e, form)} className={classes.form}>
                    <TextField
                        name="email"
                        label="Email de l'utilisateur"
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
                        Se connecter
                    </Button>
                    <Button
                        variant="outlined"
                        className={classes.button}
                        onClick={() => { history.push('/signup'); }}
                        fullWidth
                    >
                        S&apos;inscrire
                    </Button>
                </form>
            </div>
        </div>
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
    withStyles(styles),
    connect(),
])(Login);

//export default connect(null, { login: mongoAccess.Login })(withRouter(withStyles(styles)(Login)));
