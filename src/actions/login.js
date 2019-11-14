export default function login(link, user) {
    return (dispatch, getState, api) => api.post(link, user)
        .then((res) => {
            if ('false' === res.check_user || 'false' === res.check_password) {
                console.log('Pas de connexion');
            }

            if (res.token) {
                localStorage.setItem('token', res.token);
                localStorage.setItem('username', user.username);
            }
        })
        .catch((err) => {
            dispatch({
                type: 'ERROR_OCCURS',
                payload: 404,
            });

            return err;
        });
}
