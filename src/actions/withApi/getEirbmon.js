import {ERROR_OCCURS} from '../../constants/action-types';
import {LOAD_EIRBMON_SUCCESS} from '../../constants/action-types';
import generateGetEirbmonUrl from '../../middleWare/generateGetEirbmonUrl';

export default function getEirbmon(eirbmon_id) {
    return (dispatch, getState, api) => api.get(generateGetEirbmonUrl())
        .then(
            (res) => {
                dispatch({
                    type: LOAD_EIRBMON_SUCCESS,
                    payload: res,
                });

                if (res.length === 0)
                    return Promise.reject("No Eirbmon found with ID: " + eirbmon_id);

                if (eirbmon_id === null)
                    return Promise.reject("Aucun eirbmon a attrapé n'été trouvé, eirbmon_id = null");
                
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
