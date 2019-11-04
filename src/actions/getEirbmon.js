export default function getEirbmon(link) {
    return (dispatch, getState, api) => api.get(link)
        .then((res) => {
            dispatch({
                type: 'SUCCESS_OCCURS',
                payload: res,
            });

            return res;
        })
        .catch((err) => {
            dispatch({
                type: 'ERROR_OCCURS',
                payload: err,
            });

            return err;
        });
}
