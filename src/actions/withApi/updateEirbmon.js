import { ERROR_OCCURS } from '../../constants/action-types';
import { LOAD_EIRBMON_SUCCESS } from '../../constants/action-types';
import generateGetEirbmonUrl from '../../middleWare/generateGetEirbmonUrl';

export default function updateEirbmon(data) {
    return (dispatch, getState, api) => api.put(generateGetEirbmonUrl(), data)
        .then(
            (res) => {
                dispatch({
                    type: LOAD_EIRBMON_SUCCESS,
                    payload: res,
                });

                if (res.length === 0)
                    return Promise.reject("Nothing found");

                return Promise.resolve(res);
            })
        .catch((err) => {
            // dispatch({
            //     type: ERROR_OCCURS,
            //     payload: err,
            // });
            return Promise.reject(err);
        });
}