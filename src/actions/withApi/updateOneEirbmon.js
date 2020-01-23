import { ERROR_OCCURS, LOADING_START, LOADING_END } from '../../constants/action-types';
import { LOAD_EIRBMON_SUCCESS } from '../../constants/action-types';
import generateUpdateOneEirbmonUrl from '../../middleWare/generateUpdateOneEirbmonUrl';

export default function updateOneEirbmon(ownerId,eirbmonId) {
    var data = {
        owner_id:ownerId,
        id_eirbmon_blockchain: eirbmonId
    }

    return (dispatch, getState, api) => {
        dispatch({
            type: LOADING_START,
        })
        
        return api.put(generateUpdateOneEirbmonUrl(), data)
        .then(
            (res) => {
                dispatch({
                    type: LOAD_EIRBMON_SUCCESS,
                    payload: res,
                });
                dispatch({
                    type: LOADING_END,
                })
                if (res.length === 0)
                    return Promise.reject("Nothing found");

                return Promise.resolve(res);
            })
        .catch((err) => {
            dispatch({
                type: LOADING_END,
            })
            // dispatch({
            //     type: ERROR_OCCURS,
            //     payload: err,
            // });
            return Promise.reject(err);
        });
    }
}