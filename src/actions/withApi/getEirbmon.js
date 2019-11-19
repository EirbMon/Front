import {ERROR_OCCURS} from '../../constants/action-types';
import { LOAD_EIRBMON_SUCCESS } from '../../constants/action-types';

export default function getEirbmon(link) {
    console.log(link);
    return (dispatch, getState, api) => api.get(link)
        .then(
            (res) => {
                console.log(res)
                dispatch({
                    type: LOAD_EIRBMON_SUCCESS,
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
