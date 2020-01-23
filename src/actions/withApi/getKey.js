import {ERROR_OCCURS} from '../../constants/action-types';
import { LOAD_EIRBMON_SUCCESS } from '../../constants/action-types';
import generateKeyUrl from '../../middleWare/generateKeyUrl';

export default function getKey() {
    return (dispatch, getState, api) => api.get(generateKeyUrl())
        .then(
            (res) => {
                dispatch({
                    type: LOAD_EIRBMON_SUCCESS,
                    payload: res,
                });

                if (res.length === 0)
                    return Promise.reject("No Keys found");
                
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
