'use strict';

export default function saveEirbMon(eirbMonInfo) {

    return (dispatch, getState, api) => {
        // set loading screen
        dispatch({
            type: LOAD_SEARCH_REFERENCE_ITEM_START,
        });

        return api.post(eirbMonInfo)
            .then((res) => {
                return dispatch({
                    type: LOAD_SEARCH_REFERENCE_ITEM_SUCCESS,
                    payload: res
                });
            })
            .catch((err) => {

                dispatch({
                    type: "ERROR_OCCURS",
                    payload: err
                });
                dispatch({
                    type: LOAD_SEARCH_REFERENCE_ITEM_ERROR,
                });  
            });
    }
}