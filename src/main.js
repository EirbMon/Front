import { routerMiddleware, ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { SnackbarProvider } from 'notistack';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { withRouter, Route, Switch } from "react-router-dom";
import thunk from 'redux-thunk';

import API from './api';
import TestBase from './components/pageApplication/testBase';
import TestImplementation from './components/pageApplication/testImplementation';
import Game from './components/pageApplication/game';
import Login from './components/pageAuthentification/login';
import SignUp from './components/pageAuthentification/signUp';
import Profil from './components/pageApplication/profil';
import reducers from './reducers';

require('./scss/main.scss');

const myTheme = createMuiTheme();

const history = createBrowserHistory();
let store = createStore(reducers(history),
    applyMiddleware(thunk.withExtraArgument(API), routerMiddleware(history))
);
// store as GLOBAL
window.__redux__ = store;

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <MuiThemeProvider theme={myTheme}>
                <SnackbarProvider>
                    <Switch>
                        <Route path="/" exact={true} component={TestBase} />
                        <Route path="/testBase" exact={true} component={TestBase} />
                        <Route path="/testImplementation" exact={true} component={TestImplementation} />
                        <Route path="/unity" exact={true} component={Game} />
                        <Route path="/login" exact={true} component={Login} />
                        <Route path="/signUp" exact={true} component={SignUp} />
                        <Route path="/profil" exact={true} component={Profil} />
                    </Switch>
                </SnackbarProvider>
            </MuiThemeProvider>
        </ConnectedRouter>
    </Provider >
    , document.getElementById('root')
)
