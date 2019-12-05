import { SUCCESS_OCCURS, ERROR_OCCURS } from '../../constants/action-types';
import generateGetEirbmonUrl from '../../middleWare/generateGetEirbmonUrl';

export default function updateEirbmon(data) {
    return (dispatch, getState, api) => api.put(generateGetEirbmonUrl(), data)
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
