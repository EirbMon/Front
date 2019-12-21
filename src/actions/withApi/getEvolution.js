import {ERROR_OCCURS} from '../../constants/action-types';
import { LOAD_EIRBMON_SUCCESS } from '../../constants/action-types';
import generateGetEvolutionUrl from '../../middleWare/generateGetEvolutionUrl';

export default function getEvolution(eirbmon_id) {
    return (dispatch, getState, api) => api.get(generateGetEvolutionUrl(eirbmon_id))
    .then(
        (res) => {
            dispatch({
                type: LOAD_EIRBMON_SUCCESS,
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