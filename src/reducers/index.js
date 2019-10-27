import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import errorHandler from './errorHandler';
import successHandler from './succesHandler';

export default (history) => combineReducers({

    router: connectRouter(history),

    errorHandler: errorHandler,
    successHandler: successHandler,
    
    
});