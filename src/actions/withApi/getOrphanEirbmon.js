import {SUCCESS_OCCURS} from '../../constants/action-types';
import {ERROR_OCCURS} from '../../constants/action-types';
import { LOAD_EIRBMON_SUCCESS } from '../../constants/action-types';

export default function getOrphanEirbmon(link) {
    return (dispatch, getState, api) => api.get(link)
        .then((res) => {
            dispatch({
                type: SUCCESS_OCCURS,
                payload: res.status,
            });
            dispatch({
                type: LOAD_EIRBMON_SUCCESS,
                payload: res
            });

            return res;
        })
        .catch((err) => {
            dispatch({
                type: ERROR_OCCURS,
                payload: err,
            });

            return err;
        });
}
