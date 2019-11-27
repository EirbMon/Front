import { ERROR_OCCURS } from '../constants/action-types';

export default function checkToken(link, token) {
    return (dispatch, getState, api) => api.post(link, token)
        .then((res) => res)
        .catch((err) => {
            dispatch({
                type: ERROR_OCCURS,
                payload: 403,
            });

            return err;
        });
}
