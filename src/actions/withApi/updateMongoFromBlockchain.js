import { SUCCESS_OCCURS, ERROR_OCCURS } from '../../constants/action-types';
import generateUpdateMongoFromBlockchainUrl from '../../middleWare/generateUpdateMongoFromBlockchainUrl';

export default function updateMongoFromBlockchain() {
    return (dispatch, getState, api) => api.get(generateUpdateMongoFromBlockchainUrl())
        .then((res) => {
            dispatch({
                type: SUCCESS_OCCURS,
                payload: res,
            });
            return Promise.resolve();
        })
        .catch((err) => {
            // dispatch({
            //     type: ERROR_OCCURS,
            //     payload: err,
            // });
            return Promise.reject(err);
        });
}
