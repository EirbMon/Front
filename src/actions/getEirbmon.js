import { SUCCESS_OCCURS, ERROR_OCCURS } from '../constants/action-types';

export default function getEirbmon(link) {
    return (dispatch, getState, api) => api.get(link)
        .then((res) => {
            dispatch({
                type: SUCCESS_OCCURS,
                payload: res,
            });

            return Promise.resolve(res);
        })
        .catch((err) => {
            dispatch({
                type: ERROR_OCCURS,
                payload: err,
            });

            return Promise.reject(err);
        });
}
