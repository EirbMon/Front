import { SUCCESS_OCCURS, ERROR_OCCURS } from '../constants/action-types';

export default function login(link, user) {
    return (dispatch, getState, api) => api.post(link, user)
        .then((res) => {
            if ('false' === res.check_user) {
                const err = 'userDoesntExist';

                throw err;
            }

            if ('false' === res.check_password) {
                const err = 'errorPassword';

                throw err;
            }

            if (res.token) {
                localStorage.setItem('token', res.token);
                localStorage.setItem('name', res.name);
                localStorage.setItem('email', res.email);
                dispatch({
                    type: SUCCESS_OCCURS,
                    payload: 'connected',
                });
            } else {
                const err = 404;

                throw err;
            }
        })
        .catch((err) => {
            dispatch({
                type: ERROR_OCCURS,
                payload: err,
            });

            return err;
        });
}
