'use strict';

export default function saveEirbmon(link) {

    return (dispatch, getState, api) => {

        return api.post(link)
            .then((res) => {
                return dispatch({
                    type: "SUCCESS_OCCURS",
                    payload: res
                });
            })
            .catch((err) => {

                dispatch({
                    type: "ERROR_OCCURS",
                    payload: err
                });
            });
    }
}