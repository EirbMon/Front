import { SUCCESS_OCCURS, ERROR_OCCURS } from '../../constants/action-types';
import generateUpdateMongoEirbmonFromBlockchainUrl from '../../middleWare/generateUpdateMongoEirbmonFromBlockchainUrl';

export default function updateMongoEirbmonFromBlockchain() {
    return (dispatch, getState, api) => api.get(generateUpdateMongoEirbmonFromBlockchainUrl())
        .then((res) => {
            dispatch({
                type: SUCCESS_OCCURS,
                payload: res,
            });
            return Promise.resolve();
        })
        .catch((err) => {
            dispatch({
                type: ERROR_OCCURS,
                payload: err,
            });
            return Promise.reject(err);
        });
}
