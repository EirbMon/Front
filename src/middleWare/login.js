import Requetes from '../api/index';

const apiUrl = process.env.REACT_APP_APIURL;

const login = (e, user, history) => {
    e.preventDefault();

    const { post } = Requetes;

    post(`${apiUrl}api/connexion`, {
        username: user.username,
        password: user.password,
    })
        .then((json) => {
            if ('false' === json.check_user || 'false' === json.check_password) {
                console.log('Cet utilisateur existe pas');
            }

            if (json.token) {
                localStorage.setItem('token', json.token);
                localStorage.setItem('username', user.username);
                history.push('/profil');
            }
        });
};

export default login;
