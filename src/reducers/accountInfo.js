import { LOAD_ACCOUNT_SUCCESS } from '../constants/action-types';

export default function account(state, action) {

    switch (action.type) {

        case LOAD_ACCOUNT_SUCCESS: {
            let payload = action.payload;
            console.log(payload);
            return Object.assign({}, state, {
                isloading: false,
                accountUrl: payload,
            });
        }

        default: {
            // send back default datas for state
            return state || {
                isloading: false,
                error: undefined,
                accountUrl: undefined,
            }
        }
    }

}