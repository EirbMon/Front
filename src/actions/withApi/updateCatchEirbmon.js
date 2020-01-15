import { SUCCESS_OCCURS, ERROR_OCCURS } from '../../constants/action-types';
import generateUpdateCatchEirbmonUrl from '../../middleWare/generateUpdateCatchEirbmonUrl';

export default function updateCatchEirbmon(data) {
    return (dispatch, getState, api) => api.put(generateUpdateCatchEirbmonUrl(), data)
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
