import { ERROR_OCCURS } from '../../constants/action-types';
import { LOAD_EIRBMON_SUCCESS } from '../../constants/action-types';
import generateUpdateEirbmonOwnerUrl from '../../middleWare/generateUpdateEirbmonOwnerUrl';

export default function updateEirbmonOwner(ownerId,eirbmonId) {
    var data = {
        owner_id:ownerId,
        id_eirbmon_blockchain: eirbmonId
    }

    return (dispatch, getState, api) => api.put(generateUpdateEirbmonOwnerUrl(), data)
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