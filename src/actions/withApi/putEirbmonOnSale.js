import { ERROR_OCCURS, LOADING_START, LOADING_END } from '../../constants/action-types';
import { LOAD_EIRBMON_SUCCESS } from '../../constants/action-types';
import generatePutEirbmonOnSaleUrl from '../../middleWare/generatePutEirbmonOnSaleUrl';

export default function putEirbmonOnSale(eirbmmonIdBlockchain) {

    var data = {
        id_eirbmon_blockchain: eirbmmonIdBlockchain
    }

    return (dispatch, getState, api) => {
        dispatch({
            type: LOADING_START,
        })

        return api.put(generatePutEirbmonOnSaleUrl(), data)
            .then(
                (res) => {
                    dispatch({
                        type: LOADING_END,
                    })
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