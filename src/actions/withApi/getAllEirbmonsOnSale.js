import {ERROR_OCCURS} from '../../constants/action-types';
import { LOAD_EIRBMON_SUCCESS } from '../../constants/action-types';
import generateGetAllEirbmonsOnSaleUrl from '../../middleWare/generateGetAllEirbmonsOnSaleUrl';

export default function getAllEirbmonsOnSale() {
    return (dispatch, getState, api) => api.get(generateGetAllEirbmonsOnSaleUrl())
    .then(
        (res) => {
            console.log(res);
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