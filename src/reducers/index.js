import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import errorHandler from './errorHandler';
import successHandler from './succesHandler';
import accountInfo from './accountInfo';
import eirbmonsInfos from './eirbmonsInfos';
import pusher from './pusher';
import blockchain from './blockchain';

export default (history) => combineReducers({
    router: connectRouter(history),
    errorHandler,
    successHandler,
    accountInfo,
    eirbmonsInfos,
    pusher
    blockchain,
});
