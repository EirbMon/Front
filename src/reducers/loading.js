import { LOADING_START, LOADING_END} from '../constants/action-types';

export default function loading(state, action) {

    switch (action.type) {

        case LOADING_START: {
            return Object.assign({}, state, {
                status: true,
            });
        }

        case LOADING_END: {
            return Object.assign({}, state, {
                status: false,
            });
        }

        default: {
            // send back default datas for state
            return state || {
                status: false
            }
        }
    }

}