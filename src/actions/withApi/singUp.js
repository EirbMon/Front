import { SUCCESS_OCCURS, ERROR_OCCURS } from '../../constants/action-types';

export default function signUp(link, user) {
    return (dispatch, getState, api) => api.post(link, user)
        .then((res) => {
            if ('true' === res.exist_user) {
                const err = 'userAlreadyExists';
                throw err;
            }
            else if (res.user.token) {
                sessionStorage.setItem('token', res.user.token);
                sessionStorage.setItem('name', res.user.name);
                sessionStorage.setItem('email', res.user.email);
                dispatch({
                    type: SUCCESS_OCCURS,
                    payload: 'connected',
                });
            } else {
                const err = 404;
                throw err;
            }

            return res;
        })
        .catch((err) => {
            dispatch({
                type: ERROR_OCCURS,
                payload: err,
            });

            return err;
        });
}
