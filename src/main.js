import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { routerMiddleware, ConnectedRouter } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import reducers from './reducers'
import thunk from 'redux-thunk';

import AppComponent from "./components";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { SnackbarProvider } from 'notistack';

import API from './api';

require('./scss/main.scss');

const myTheme = createMuiTheme();

const history = createBrowserHistory()
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
                        <AppComponent />
                    </SnackbarProvider>

            </MuiThemeProvider>
        </ConnectedRouter>
    </Provider >
    ,
    document.getElementById('root')
)