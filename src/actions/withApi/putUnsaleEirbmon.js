import { ERROR_OCCURS, LOADING_START, LOADING_END } from '../../constants/action-types';
import generatePutUnsaleEirbmonUrl from '../../middleWare/generatePutUnsaleEirbmonUrl';

export default function putEirbmonOnSale(eirbmmonIdBlockchain) {

    var data = {
        id_eirbmon_blockchain: eirbmmonIdBlockchain
    }

    return (dispatch, getState, api) => {
        dispatch({
            type: LOADING_START,
        })

        return api.put(generatePutUnsaleEirbmonUrl(), data)
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
                dispatch({
                    type: ERROR_OCCURS,
                    payload: err,
                });
                return Promise.reject(err);
            });
    }
}