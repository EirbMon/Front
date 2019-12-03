import { INFORMATION_BLOCKCHAIN } from '../constants/action-types';

export default function blockchain(state, action) {
    switch (action.type) {
        case INFORMATION_BLOCKCHAIN: {
            return {
                ...state,
                blockchain: action.payload,
            };
        }
        default: {
            return { ...state };
        }
    }
}
