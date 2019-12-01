import { SUCCESS_OCCURS, ERROR_OCCURS } from '../constants/action-types';

export default function updateEirbmonOwner(link, ownerID) {
    return (dispatch, getState, api) => api.put(link, ownerID)
        .then((res) => {
            dispatch({
                type: SUCCESS_OCCURS,
                payload: res,
            });
        })
        .catch((err) => {
            dispatch({
                type: ERROR_OCCURS,
                payload: err,
            });
        });
}
