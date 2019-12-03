import { INFORMATION_BLOCKCHAIN } from '../constants/action-types';

export default function blockchain(data) {
    return ({
        type: INFORMATION_BLOCKCHAIN,
        payload: data,
    });
}
