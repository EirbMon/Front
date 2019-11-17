import {ERROR_OCCURS} from '../constants/action-types';

const initObj = {
    timeStamp: undefined,
    error: undefined,
    errorMessage: undefined,
};

const errorTab = {
    404: 'Not Found',
    500: 'Server Error Occurs',
    504: 'Server Response Is Too Long',
    403: 'You Are Not Authorized',
    407: 'Invalid Data Form',
    502: 'Unable To Reach The Server',
    409: 'Unique Constraint Is Not Respected',
    authID: 'Authentification failed',
};

export default function errorHandler(state, action) {
    switch (action.type) {
        case ERROR_OCCURS: {
            return { ...state,
                ...initObj,
                timeStamp: new Date(),
                error: action.payload,
                errorMessage: errorTab[action.payload] ? errorTab[action.payload] : 'Unknown Error' };
        }
        default: {
            // send back default datas for state
            return { ...state, ...initObj };
        }
    }
}
