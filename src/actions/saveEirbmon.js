import {ERROR_OCCURS} from '../constants/action-types';

export default function saveEirbmon(link, eirbmonInfo) {
    return (dispatch, getState, api) => api.post(link, eirbmonInfo)
        .then((res) => dispatch({
            type: 'SUCCESS_OCCURS',
            payload: res,
        }))
        .catch((err) => {
            dispatch({
                type: ERROR_OCCURS,
                payload: err,
            });
        });
}
