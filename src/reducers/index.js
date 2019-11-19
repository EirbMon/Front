import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import errorHandler from './errorHandler';
import successHandler from './succesHandler';
import accountInfo from './accountInfo';
import eirbmonsInfo from './eirbmonsInfos';

export default (history) => combineReducers({
    router: connectRouter(history),
    errorHandler,
    successHandler,
    accountInfo,
    eirbmonsInfo
});
