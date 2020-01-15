import { ERROR_OCCURS } from '../../constants/action-types';
import generateCheckInitAccount from '../../middleWare/generateCheckInitAccount';
import { LOAD_EIRBMON_SUCCESS } from '../../constants/action-types';

export default function checkInitAccount(data) {
    return (dispatch, getState, api) => api.post(generateCheckInitAccount(), data)
        .then((res) => {
            console.log(res);
            dispatch({
                type:  LOAD_EIRBMON_SUCCESS,
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
