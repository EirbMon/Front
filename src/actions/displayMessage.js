import { ERROR_OCCURS } from '../constants/action-types';

export default function displayMessage(message) {
    return ({
        type: ERROR_OCCURS,
        payload: message,
    });
}
