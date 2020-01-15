import { LOAD_ACCOUNT_SUCCESS } from '../constants/action-types';

export default function accountInfo(state, action) {
    switch (action.type) {
        case LOAD_ACCOUNT_SUCCESS: {
            let payload = action.payload;
            return Object.assign({}, state, {
                accountUrl: payload,
            });
        }

        default: {
            // send back default datas for state
            return state || {
                accountUrl: undefined,
            }
        }
    }

}