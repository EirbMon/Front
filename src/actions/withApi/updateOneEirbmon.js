import { ERROR_OCCURS } from '../../constants/action-types';
import { LOAD_EIRBMON_SUCCESS } from '../../constants/action-types';
import generateUpdateOneEirbmonUrl from '../../middleWare/generateUpdateOneEirbmonUrl';

export default function updateOneEirbmon(ownerId,eirbmonId) {
    var data = {
        owner_id:ownerId,
        id_eirbmon_blockchain: eirbmonId
    }

    return (dispatch, getState, api) => api.put(generateUpdateOneEirbmonUrl(), data)
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
            dispatch({
                type: ERROR_OCCURS,
                payload: err,
            });
            return Promise.reject(err);
        });
}