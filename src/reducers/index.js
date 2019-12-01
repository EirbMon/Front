import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import errorHandler from './errorHandler';
import successHandler from './succesHandler';
import pusher from './pusher';

export default (history) => combineReducers({
    router: connectRouter(history),
    errorHandler,
    successHandler,
    pusher,
});
