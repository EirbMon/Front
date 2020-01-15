import React from 'react';
import ReactDOM from 'react-dom';
import { routerMiddleware, ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { SnackbarProvider } from 'notistack';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { Route, Switch } from 'react-router-dom';
import thunk from 'redux-thunk';

import Game from './components/pageApplication/game';
import ExchangeEirbmon from './components/pageApplication/exchangeEirbmon';
import Eirbdex from './components/pageApplication/eirbdex';
import Accueil from './components/pageAccueil';
import Login from './components/pageAuthentification/login';
import Connect from './components/pageAuthentification/connectBlockchain';
import SignUp from './components/pageAuthentification/signUp';
import Profil from './components/pageApplication/profil';
import EirbmonsStore from './components/pageApplication/eirbmonsStore';
import Snackbar from './components/utils/snackbar';
import reducers from './reducers';
import API from './api';

require('./scss/main.scss');

const myTheme = createMuiTheme();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;// eslint-disable-line no-underscore-dangle

const history = createBrowserHistory();
const store = createStore(reducers(history),
composeEnhancers(applyMiddleware(thunk.withExtraArgument(API), routerMiddleware(history))));

// eslint-disable-next-line no-underscore-dangle
window.__redux__ = store;

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <MuiThemeProvider theme={myTheme}>
                <SnackbarProvider>
                    <Snackbar>
                        <Switch>
                            <Route path="/" exact component={Accueil} />
                            <Route path="/accueil" exact component={Accueil} />
                            <Route path="/unity" component={Game} />
                            <Route path="/login" component={Login} />
                            <Route path="/connect" component={Connect} />
                            <Route path="/signUp" component={SignUp} />
                            <Route path="/profil" component={Profil} />
                            <Route path="/eirbdex" exact component={Eirbdex} />
                            <Route path="/exchangeEirbmon" exact component={ExchangeEirbmon} />
                            <Route path="/EirbmonsStore" exact component={EirbmonsStore}></Route>
                        </Switch>
                    </Snackbar>
                </SnackbarProvider>
            </MuiThemeProvider>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root'),
);
// ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
