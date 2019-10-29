'use strict';

export default function getEirbmon(link) {
    console.log("GetEirbmon: " + link);
    return (dispatch, getState, api) => {

        return api.get(link)
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