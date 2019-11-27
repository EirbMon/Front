import { LOAD_EIRBMON_SUCCESS } from '../constants/action-types';

export default function account(state, action) {

    switch (action.type) {

        case LOAD_EIRBMON_SUCCESS: {
            let payload = action.payload;
            console.log(payload);
            return Object.assign({}, state, {
                isloading: false,
                eirbmons: payload,
            });
        }

        default: {
            // send back default datas for state
            return state || {
                isloading: false,
                eirbmons: undefined,
            }
        }
    }

}