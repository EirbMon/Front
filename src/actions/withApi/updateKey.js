import { SUCCESS_OCCURS, ERROR_OCCURS } from '../../constants/action-types';
import generateKeyUrl from '../../middleWare/generateKeyUrl';

export default function updateKey(data) {
    return (dispatch, getState, api) => api.put(generateKeyUrl(), data)
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
        });
}
