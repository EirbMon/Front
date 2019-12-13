import {ERROR_OCCURS} from '../../constants/action-types';
import { LOAD_EIRBMON_SUCCESS } from '../../constants/action-types';
import generateGetOwnerEirbmonUrl from '../../middleWare/generateGetOwnerEirbmonUrl';

export default function getOwnerEirbmon(owner_id, number = 0) {
    console.log(owner_id + " et " + number);
    return (dispatch, getState, api) => api.get(generateGetOwnerEirbmonUrl(owner_id,number))
    .then(
        (res) => {
            dispatch({
                type: LOAD_EIRBMON_SUCCESS,
                payload: res,
            });

            if (res.length === 0 && owner_id === '0x0000000000000000000000000000000000000000')
                return Promise.reject('Orphean eirbmon Not found in MongoDB');
                
            if (res.length === 0)
                return Promise.reject("No Eirbmon found with owner: " + owner_id);

            
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