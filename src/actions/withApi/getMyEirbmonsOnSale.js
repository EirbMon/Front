import { ERROR_OCCURS } from '../../constants/action-types';
import { LOAD_EIRBMON_SUCCESS } from '../../constants/action-types';
import generateGetMyEirbmonsOnSaleUrl from '../../middleWare/generateGetMyEirbmonsOnSaleUrl';

export default function getMyEirbmonsOnSale(owner_id, number = 0) {
    return (dispatch, getState, api) => api.get(generateGetMyEirbmonsOnSaleUrl(owner_id, number))
        .then(
            (res) => {

                console.log(res);
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