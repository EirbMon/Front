export default function signUp(link, user) {
    return (dispatch, getState, api) => api.post(link, user)
        .then((res) => {
            api.post('https://localhost:8080/api/connexion', {
                username: res.username,
                password: res.password,
            });

            return res;
        })
        .catch((err) => {
            dispatch({
                type: 'ERROR_OCCURS',
                payload: 404,
            });

            return err;
        });
}
