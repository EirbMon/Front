import { routerMiddleware, ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Route, Switch } from 'react-router-dom';
import thunk from 'redux-thunk';

import Game from './components/pageApplication/game';
import Eirbdex from './components/pageApplication/eirbdex';
import Login from './components/pageAuthentification/login';
import Connect from './components/pageAuthentification/connectBlockchain';
import SignUp from './components/pageAuthentification/signUp';
import Profil from './components/pageApplication/profil';
import Snackbar from './components/utils/snackbar';
import reducers from './reducers';
import API from './api';
import Web3Provider from 'react-web3-provider';

require('./scss/main.scss');

const myTheme = createMuiTheme();

const history = createBrowserHistory();
const store = createStore(reducers(history),
    applyMiddleware(thunk.withExtraArgument(API), routerMiddleware(history)));

// eslint-disable-next-line no-underscore-dangle
window.__redux__ = store;

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <MuiThemeProvider theme={myTheme}>
                <SnackbarProvider>
                    <Snackbar>
                        <Switch>
                            <Route path="/" exact component={Login} />
                            <Route path="/unity" component={Game} />
                            <Route path="/login" component={Login} />
                            <Route path="/connect" component={Connect} />
                            <Route path="/signUp" component={SignUp} />
                            <Route path="/profil" component={Profil} />
                            <Route path="/eirbdex" exact component={Eirbdex} />
                        </Switch>
                    </Snackbar>
                </SnackbarProvider>
            </MuiThemeProvider>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root'),
);
